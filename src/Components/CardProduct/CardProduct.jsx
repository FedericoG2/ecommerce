import { Link } from 'react-router'
import { useCart } from '../../Context/CartContext'
import { formatPrice } from '../../lib/format'

const CardProduct = ({
    product: { id, name, imageUrl, description, price, stock },
}) => {
    const { addToCart, loading, openModal } = useCart()
    const outOfStock = stock === 0

    const handleAddToCart = async () => {
        await addToCart({ id, name, price, imageUrl, description, stock })
        openModal()
    }

    return (
        <article className="flex h-full flex-col">
            <Link to={`/detailProduct/${id}`} className="block bg-stone-200">
                <img
                    className="aspect-square w-full object-cover"
                    src={imageUrl}
                    alt={name}
                />
            </Link>
            <div className="flex flex-1 flex-col pt-4">
                <div className="flex items-start justify-between gap-3">
                    <Link
                        to={`/detailProduct/${id}`}
                        className="font-serif text-lg leading-tight hover:underline"
                    >
                        {name}
                    </Link>
                    <p className="shrink-0 text-sm">{formatPrice(price)}</p>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-stone-500">
                    {description}
                </p>
                <p className="mb-4 mt-2 text-xs uppercase tracking-wide text-stone-400">
                    {outOfStock ? 'Sin stock' : `${stock} en stock`}
                </p>
                <button
                    onClick={handleAddToCart}
                    disabled={loading || outOfStock}
                    className="mt-auto h-10 w-full border border-stone-900 text-sm hover:bg-stone-900 hover:text-white disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400"
                >
                    {outOfStock ? 'Agotado' : 'Agregar'}
                </button>
            </div>
        </article>
    )
}

export default CardProduct
