import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner'

export default function Compra() {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('Carrito')) || [];
        setCarrito(saved);
    }, []);


    useEffect(() => {
        let t = 0;
        for (let i = 0; i < carrito.length; i++) {
            const cantidad = Number(carrito[i].cantidadCarro || 1);
            const precio = Number(carrito[i].precio || 0);
            t += cantidad * precio;
        }
        setTotal(t);

        localStorage.setItem('Carrito', JSON.stringify(carrito));
    }, [carrito]);

    const eliminarItem = (index) => {
        const copy = [...carrito];
        copy.splice(index, 1);
        setCarrito(copy);
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
        if (carrito.length === 0) return toast.error('Carrito vacío');//alert('Carrito vacío');
        toast.success('Compra realizada: $' + total.toFixed(2))//alert('Compra realizada: $' + total.toFixed(2));
        localStorage.removeItem('Carrito');
        setCarrito([]);
    };

    return (
        <main className="min-h-screen">
            <Toaster position="top-center" richColors />
            <div className="container">
                <div className="container" id="titulo">
                    <h1><strong>Carrito de Compras</strong></h1>
                </div>

                <div className="row justify-content-center" id="contenedorItems">
                    {carrito.length === 0 && (
                        <div className="col-12 text-center my-4">
                            <p>El carrito está vacío.</p>
                        </div>
                    )}

                    {carrito.map((item, i) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-3" key={item.id + '-' + i}>
                            <div className="card h-100 shadow-sm">
                                <img src={item.img || 'img/img_pyme.jpg'} className="card-img-top" alt={item.nombre} style={{ height: 160, objectFit: 'cover' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{item.nombre}</h5>
                                    <p className="card-text">Precio: ${Number(item.precio).toFixed(2)}</p>
                                    <p className="card-text">En Stock: {item.stock}</p>

                                    <div className="mb-3 mt-auto">
                                        <label htmlFor={`cantidad${i}`} className="form-label">Cantidad</label>
                                        <input
                                            id={`cantidad${i}`}
                                            type="number"
                                            className="form-control"
                                            min="1"
                                            max={item.stock}
                                            value={item.cantidadCarro || 1}
                                            onChange={(e) => handleCantidadChange(i, e.target.value)}
                                            style={{ maxWidth: 120 }}
                                        />
                                    </div>

                                    <button className="btn btn-danger mt-2" onClick={() => eliminarItem(i)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="container my-4">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-8 col-md-6">
                            <div className="card text-center shadow-lg border-0 rounded-4 p-3" style={{ background: '#f8f9fa' }}>
                                <h5 className="card-title mb-2" style={{ color: '#343a40' }}>Resumen de compra</h5>
                                <p className="card-text fs-5">
                                    Total a pagar: $<span id="precioTotal" className="fw-bold text-success">{total.toFixed(2)}</span> Dólares
                                </p>
                                
                                <button className="btn btn-success btn-lg mt-2 w-75 mx-auto" id="pagarBtn" onClick={pagar}>
                                    Pagar Ahora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
