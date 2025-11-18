import React, { useState } from "react";
import { Toaster,toast } from "sonner";
// Componente para cada tarjeta de producto
const ItemCard = ({ item }) => {
    const [isInCart, setIsInCart] = useState(false);

    const handleAddToCart = () => {
        const compra = {
            id: item.id,
            nombre: item.nombre,
            precio: item.precio,
            stock: item.stock,
            cantidadCarro: 1
        };

        let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

        const index = carrito.findIndex(prod => prod.id === item.id);

        let message = "Artículo añadido al Carrito de Compras.";

        if (index === -1) {
            carrito.push(compra);
            localStorage.setItem("Carrito", JSON.stringify(carrito));
            setIsInCart(true);
            toast.success(mensaje);
        } else {
            message = "Este producto ya está en el carrito.";
            toast.warning(message);
        }

        
    };

    return (
        
        <div className="col">
            <Toaster position="top-center" richColors />
            <div className="card shadow-sm h-100">
                <img src="img/img_pyme.jpg" className="card-img-top" alt={item.nombre} />
                <div className="card-body text-center">
                    <h5 className="card-title">{item.nombre}</h5>
                    <p className="card-text">Precio : {item.precio} dólares</p>
                    <p className="card-text">En Stock : {item.stock}</p>
                    <button
                        className={`btn btn-success mt-auto addCarrito ${isInCart ? 'disabled' : ''}`}
                        onClick={handleAddToCart}
                        disabled={isInCart}
                    >
                        {isInCart ? "Añadido al Carrito" : "Añadir al carrito"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
