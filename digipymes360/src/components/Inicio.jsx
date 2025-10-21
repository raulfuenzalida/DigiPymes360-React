import { createContext, useState, useEffect } from "react";

export const CatalogContext = createContext();

export default function Inicio({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); 

    useEffect(() => {
        
        fetch("http://localhost:8082/api/v1/producto/precio?minimo=0&maximo=99999999999")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error cargando productos:", err);
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        setProducts((prevProducts) =>
            prevProducts.filter((product) =>
                product.nombre.toLowerCase().includes(value)
            )
        );
    };

    return (
        <CatalogContext.Provider value={{ products, loading }}>
            <main className="min-h-screen">
                <div className="container text-center mt-4 d-flex flex-column align-items-center" id="titulo">
                    <h1><strong>Bienvenido a DigiPymes360</strong></h1>
                    <h3>La vitrina digital para pequeñas y medianas empresas</h3>
                </div>

                <section className="container my-4 d-flex justify-content-center">
                    <div className="input-group" style={{ maxWidth: '500px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar Productos..."
                            id="buscarInput"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button className="btn btn-primary" type="button" id="buscarButton">
                            Buscar
                        </button>
                    </div>
                </section>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4" id="contenedorItems">
                    {!loading ? (
                        products.map((product, index) => (
                            <div key={index} className="col">
                                {children(product)} 
                            </div>
                        ))
                    ) : (
                        <p>Cargando productos...</p>
                    )}
                </div>
            </main>
        </CatalogContext.Provider>
    );
}
