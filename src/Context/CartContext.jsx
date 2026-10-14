import { createContext, useState, useEffect, useContext } from 'react'
import { toast } from 'react-hot-toast'

export const CartContext = createContext({})

const CART_KEY = 'cart'

const loadLocalCart = () => {
    try {
        const localCart = localStorage.getItem(CART_KEY)
        const items = localCart ? JSON.parse(localCart) : []
        return items.map((item) => ({
            ...item,
            id: item.id || item._id,
        }))
    } catch (error) {
        console.error('Error al cargar carrito local:', error)
        return []
    }
}

const saveLocalCart = (cartItems) => {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
    } catch (error) {
        console.error('Error al guardar carrito local:', error)
    }
}

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [itemsQuantity, setItemsQuantity] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setCart(loadLocalCart())
        setLoading(false)
    }, [])

    useEffect(() => {
        const newTotal = cart.reduce(
            (acc, item) => acc + item.price * (item.quantity || 1),
            0
        )
        setTotal(newTotal)
        const newItemsQuantity = cart.reduce(
            (acc, item) => acc + (item.quantity || 1),
            0
        )
        setItemsQuantity(newItemsQuantity)
    }, [cart])

    const addToCart = (product, quantity = 1) => {
        const currentCart = [...cart]
        const existingIndex = currentCart.findIndex(
            (item) => item.id === product.id
        )

        if (existingIndex > -1) {
            currentCart[existingIndex] = {
                ...currentCart[existingIndex],
                quantity: currentCart[existingIndex].quantity + quantity,
            }
        } else {
            currentCart.push({ ...product, quantity })
        }

        setCart(currentCart)
        saveLocalCart(currentCart)
        toast.success('Producto agregado al carrito')
    }

    const removeFromCart = (productId) => {
        const currentCart = cart.filter((item) => item.id !== productId)
        setCart(currentCart)
        saveLocalCart(currentCart)
        toast.success('Producto eliminado del carrito')
    }

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            toast.error('La cantidad debe ser al menos 1')
            return
        }

        const currentCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        )
        setCart(currentCart)
        saveLocalCart(currentCart)
    }

    const clearCart = () => {
        setCart([])
        saveLocalCart([])
        toast.success('Carrito limpiado')
    }

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <CartContext.Provider
            value={{
                cart,
                total,
                itemsQuantity,
                isModalOpen,
                loading,
                addToCart,
                removeFromCart,
                clearCart,
                openModal,
                closeModal,
                updateQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
