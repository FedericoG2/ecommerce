import { Link } from 'react-router'
import Cart from './Cart'

const Navbar = () => {
    return (
        <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#f6f3ee]/95 backdrop-blur">
            <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
                <Link to="/" className="font-serif text-2xl tracking-tight">
                    Taller Blanco
                </Link>
                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className="text-sm text-stone-600 hover:text-stone-900"
                    >
                        Tienda
                    </Link>
                    <Link
                        to="/admin/dashboard/products"
                        className="text-sm text-stone-400 hover:text-stone-900"
                    >
                        Admin
                    </Link>
                    <Cart />
                </div>
            </nav>
        </header>
    )
}

export default Navbar
