import CardProduct from '../Components/CardProduct/CardProduct'
import { useProduct } from '../Context/ProductContext'

const Home = () => {
    const { products, productsLoading, error } = useProduct()

    return (
        <div>
            <section className="border-b border-stone-200 py-12 sm:py-16">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                    Cerámica de mesa
                </p>
                <h1 className="mt-3 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
                    Piezas para el café de todos los días
                </h1>
                <p className="mt-4 max-w-lg text-stone-600">
                    Tazas y vajilla de cerámica. Stock real, precios en pesos
                    y envío a todo el país.
                </p>
            </section>

            <section className="pt-10">
                <div className="mb-6 flex items-end justify-between">
                    <h2 className="font-serif text-2xl">Catálogo</h2>
                    {!productsLoading && !error && (
                        <p className="text-sm text-stone-500">
                            {products.length} piezas
                        </p>
                    )}
                </div>

                {productsLoading ? (
                    <div className="flex justify-center py-20">
                        <span className="loading loading-spinner"></span>
                    </div>
                ) : error ? (
                    <p className="text-stone-600">
                        No pudimos cargar los productos.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
                        {products.map((product) => (
                            <CardProduct key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home
