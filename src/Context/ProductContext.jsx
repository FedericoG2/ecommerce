import {
    useState,
    useEffect,
    useCallback,
    createContext,
    useContext,
} from 'react'
import { supabase } from '../lib/supabase'

export const ProductContext = createContext({})

const toProduct = (row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    stock: row.stock,
    imageUrl: row.image_url,
})

const toRow = (data) => ({
    name: data.name,
    description: data.description,
    price: Number(data.price),
    stock: Number(data.stock),
    image_url: data.imageUrl,
})

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [productsLoading, setProductsLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [productLoading, setProductLoading] = useState(true)
    const [error, setError] = useState(null)

    const getProducts = useCallback(async () => {
        try {
            const { data, error: queryError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })

            if (queryError) throw queryError
            setProducts((data || []).map(toProduct))
        } catch (err) {
            setError(err.message || 'Error al obtener los productos')
        } finally {
            setProductsLoading(false)
        }
    }, [])

    const getProductById = useCallback(async (id) => {
        setProductLoading(true)
        setProduct({})
        try {
            const { data, error: queryError } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single()

            if (queryError) throw queryError
            setProduct(toProduct(data))
        } catch (err) {
            setError(err.message || 'Error al obtener el producto')
        } finally {
            setProductLoading(false)
        }
    }, [])

    const updateProduct = useCallback(async (id, data) => {
        try {
            const { data: row, error: queryError } = await supabase
                .from('products')
                .update(toRow(data))
                .eq('id', id)
                .select()
                .single()

            if (queryError) throw queryError

            const updated = toProduct(row)
            setProduct(updated)
            setProducts((prevProducts) =>
                prevProducts.map((p) => (p.id === id ? updated : p))
            )

            return {
                success: true,
                message: 'Producto actualizado correctamente',
            }
        } catch (err) {
            setError(err.message || 'Error al actualizar el producto')
            return {
                success: false,
                message: 'Error al actualizar el producto',
            }
        }
    }, [])

    const createProduct = useCallback(async (data) => {
        try {
            const { data: row, error: queryError } = await supabase
                .from('products')
                .insert(toRow(data))
                .select()
                .single()

            if (queryError) throw queryError

            setProducts((prevProducts) => [toProduct(row), ...prevProducts])

            return {
                success: true,
                message: 'Producto creado correctamente',
            }
        } catch (err) {
            setError(err.message || 'Error al crear el producto')
            return {
                success: false,
                message: err.message || 'Error al crear el producto',
            }
        }
    }, [])

    const deleteProduct = useCallback(async (id) => {
        try {
            const { error: queryError } = await supabase
                .from('products')
                .delete()
                .eq('id', id)

            if (queryError) throw queryError

            setProducts((prevProducts) =>
                prevProducts.filter((p) => p.id !== id)
            )

            return {
                success: true,
                message: 'Producto eliminado correctamente',
            }
        } catch (err) {
            setError(err.message || 'Error al eliminar el producto')
            return {
                success: false,
                message: 'Error al eliminar el producto',
            }
        }
    }, [])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    const value = {
        product,
        products,
        productsLoading,
        productLoading,
        error,
        getProducts,
        getProductById,
        updateProduct,
        createProduct,
        deleteProduct,
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => useContext(ProductContext)
