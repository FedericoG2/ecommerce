import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { useProduct } from '../Context/ProductContext'
import { useCart } from '../Context/CartContext'
import { formatPrice } from '../lib/format'

const DetailProduct = () => {
    const { id } = useParams()
    const { getProductById, product, productLoading } = useProduct()
    const { addToCart, openModal } = useCart()

    useEffect(() => {
        getProductById(id)
    }, [id, getProductById])

    const handleAddToCart = async () => {
        await addToCart(product)
        openModal()
    }

    if (productLoading) {
        return (
            <div className="flex justify-center py-24">
                <span className="loading loading-spinner"></span>
            </div>
        )
    }

    if (!product?.id) {
        return (
            <p className="py-16 text-stone-600">No encontramos esa pieza.</p>
        )
    }

    const outOfStock = product.stock === 0

    return (
        <div className="py-8">
            <Link
                to="/"
                className="text-sm text-stone-500 hover:text-stone-900"
            >
                Volver al catálogo
            </Link>

            <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
                <div className="bg-stone-200">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="aspect-square w-full object-cover"
                    />
                </div>

                <section className="flex flex-col">
                    <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                        Taller Blanco
                    </p>
                    <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                        {product.name}
                    </h1>
                    <p className="mt-4 text-2xl">{formatPrice(product.price)}</p>
                    <p className="mt-6 max-w-md text-stone-600">
                        {product.description}
                    </p>
                    <p className="mt-4 text-sm text-stone-500">
                        {outOfStock
                            ? 'Sin stock por ahora'
                            : `${product.stock} unidades disponibles`}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        disabled={outOfStock}
                        className="mt-8 h-12 bg-stone-900 text-sm tracking-wide text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
                    >
                        {outOfStock ? 'Agotado' : 'Agregar al carrito'}
                    </button>

                    <ul className="mt-8 space-y-2 border-t border-stone-200 pt-6 text-sm text-stone-500">
                        <li>Cerámica de uso diario</li>
                        <li>Envío a todo el país</li>
                        <li>Stock actualizado en el momento</li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default DetailProduct
