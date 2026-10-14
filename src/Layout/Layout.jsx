import { Outlet } from 'react-router'
import Navbar from '../Components/Navbar/Navbar'

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#f6f3ee] text-stone-900">
            <Navbar />
            <main className="mx-auto w-full max-w-6xl px-5 pb-20">
                <Outlet />
            </main>
            <footer className="border-t border-stone-200">
                <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-serif text-base text-stone-800">
                        Taller Blanco
                    </p>
                    <p>Cerámica de mesa · Envíos a todo el país</p>
                </div>
            </footer>
        </div>
    )
}

export default Layout
