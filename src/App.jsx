import { Routes, Route } from 'react-router'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import { ProductContextProvider } from './Context/ProductContext'
import { CartContextProvider } from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import DetailProduct from './Pages/DetailProduct'
import AdminDashboard from './Pages/AdminDashboard'

function App() {
    return (
        <ProductContextProvider>
            <CartContextProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/detailProduct/:id"
                            element={<DetailProduct />}
                        />
                        <Route
                            path="/admin/dashboard/*"
                            element={<AdminDashboard />}
                        />
                    </Route>
                </Routes>
            </CartContextProvider>
            <Toaster />
        </ProductContextProvider>
    )
}

export default App
