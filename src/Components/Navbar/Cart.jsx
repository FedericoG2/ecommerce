import ModalCart from './ModalCart'
import { useCart } from '../../Context/CartContext'

const Cart = () => {
    const { itemsQuantity, openModal, isModalOpen } = useCart()

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 hover:border-stone-900"
                aria-label="Abrir carrito"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                    />
                </svg>
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-900 px-1 text-[11px] text-white">
                    {itemsQuantity}
                </span>
            </button>
            {isModalOpen && <ModalCart />}
        </>
    )
}

export default Cart
