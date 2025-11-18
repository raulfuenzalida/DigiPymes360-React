import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img_pyme from "../img/img_pyme.jpg";

export default function Compra() {
    const [carrito, setCarrito] = useState(null);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("Carrito")) || [];
        setCarrito(saved);
    }, []);


    useEffect(() => {
        if (!carrito) return;

        let t = 0;
        for (const item of carrito) {
            const cantidad = Number(item.cantidadCarro || 1);
            const precio = Number(item.precio || 0);
            t += cantidad * precio;
        }
        setTotal(t);
        localStorage.setItem("Carrito", JSON.stringify(carrito));
    }, [carrito]);


    const eliminarItem = (index) => {
        const copy = [...carrito];
        copy.splice(index, 1);
        setCarrito(copy);

        if (copy.length === 0) {
            localStorage.removeItem("Carrito");
            setTimeout(() => navigate("/"), 400);
        }
    };


    const handleCantidadChange = (index, value) => {
        const copy = [...carrito];
        let v = parseInt(value, 10) || 1;
        if (v < 1) v = 1;
        if (v > copy[index].stock) v = copy[index].stock;
        copy[index].cantidadCarro = v;
        setCarrito(copy);
    };


    const pagar = () => {
        if (!carrito || carrito.length === 0) {
            alert("Carrito vacío");
            return;
        }

        alert(`Compra realizada con éxito por $${total.toFixed(2)} dólares.`);
        localStorage.removeItem("Carrito");
        setCarrito([]);
        setTimeout(() => navigate("/"), 400);
    };


    if (carrito === null) {
        return (
            <main className="min-h-screen d-flex justify-content-center align-items-center">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </main>
        );
    }


    return (
        <main className="min-h-screen">
            <div className="container">
                <div className="container" id="titulo">
                    <h1><strong>Carrito de Compras</strong></h1>
                </div>

                <div className="row justify-content-center" id="contenedorItems">
                    {carrito.length === 0 ? (
                        <div className="col-12 text-center my-4">
                            <p>El carrito está vacío.</p>
                        </div>
                    ) : (
                        carrito.map((item, i) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-3" key={`${item.id}-${i}`}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={img_pyme}
                                        className="card-img-top"
                                        alt={item.nombre}
                                        style={{ height: 160, objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex flex-column text-center">
                                        <h5 className="card-title">{item.nombre}</h5>
                                        <p className="card-text">Precio: ${Number(item.precio).toFixed(2)} dólares</p>
                                        <p className="card-text">En Stock: {item.stock}</p>

                                        <div className="mb-3">
                                            <label htmlFor={`cantidad${i}`} className="form-label">Cantidad</label>
                                            <input
                                                id={`cantidad${i}`}
                                                type="number"
                                                className="form-control mx-auto"
                                                min="1"
                                                max={item.stock}
                                                value={item.cantidadCarro || 1}
                                                onChange={(e) => handleCantidadChange(i, e.target.value)}
                                                style={{ maxWidth: 120 }}
                                            />
                                        </div>

                                        <button
                                            className="btn btn-danger btn-sm w-50 mx-auto mt-auto"
                                            onClick={() => eliminarItem(i)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {carrito.length > 0 && (
                    <div className="container my-4">
                        <div className="row justify-content-center">
                            <div className="col-12 col-sm-8 col-md-6">
                                <div className="card text-center shadow-lg border-0 rounded-4 p-3" style={{ background: "#f8f9fa" }}>
                                    <h5 className="card-title mb-2" style={{ color: "#343a40" }}>
                                        Resumen de compra
                                    </h5>
                                    <p className="card-text fs-5">
                                        Total a pagar: $
                                        <span className="fw-bold text-success">{total.toFixed(2)}</span> Dólares
                                    </p>
                                    <button
                                        className="btn btn-success btn-lg mt-2 w-75 mx-auto"
                                        onClick={pagar}
                                    >
                                        Pagar Ahora
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
