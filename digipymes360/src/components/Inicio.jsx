import { createContext, useState, useEffect } from "react";
import load_img from "../img/loading.gif";

export const CatalogContext = createContext();

export default function Inicio({ children }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("http://localhost:8082/api/v1/producto/precio?minimo=0&maximo=99999999999")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error cargando productos:", err);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
    };

    const handleSearchClick = () => {
        const filtrados = products.filter((p) =>
            p.nombre.toLowerCase().includes(searchTerm)
        );
        setFilteredProducts(filtrados);
    };

    
    const handleAddToCart = (product) => {
        const compra = {
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            stock: product.stock,
            cantidadCarro: 1,
        };

        let carrito = localStorage.getItem("Carrito");
        carrito = carrito ? JSON.parse(carrito) : [];

        const index = carrito.findIndex((p) => p.id === product.id);

        let mensaje = "Artículo añadido al Carrito de Compras.";

        if (index === -1) {
            carrito.push(compra);
            localStorage.setItem("Carrito", JSON.stringify(carrito));
        } else {
            mensaje = "Este producto ya está en el carrito.";
        }

        alert(mensaje);
    };

    return (
        <CatalogContext.Provider value={{ products, loading, handleAddToCart }}>
            <main className="min-h-screen">
                <div className="container text-center mt-4 d-flex flex-column align-items-center" id="titulo">
                    <h1><strong>Bienvenido a DigiPymes360</strong></h1>
                    <h3>La vitrina digital para pequeñas y medianas empresas</h3>
                </div>

                <section className="container my-4 d-flex justify-content-center">
                    <div className="input-group" style={{ maxWidth: "500px" }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar Productos..."
                            id="buscarInput"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            id="buscarButton"
                            onClick={handleSearchClick}
                        >
                            Buscar
                        </button>
                    </div>
                </section>

                <div
                    className={`row g-4 ${filteredProducts.length < 4
                        ? "justify-content-center"
                        : "row-cols-1 row-cols-sm-2 row-cols-md-4"
                        }`}
                    id="contenedorItems"
                >
                    {!loading ? (
                        filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <div key={index} className="col" style={{ maxWidth: "320px" }}>
                                    {children(product, handleAddToCart)}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-light">
                                No se encontraron productos.
                            </p>
                        )
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                            }}
                        >
                            <img
                                src={load_img}
                                alt="Cargando..."
                                style={{ width: "128px", height: "auto" }}
                            />
                        </div>
                    )}
                </div>
            </main>
        </CatalogContext.Provider>
    );
}
