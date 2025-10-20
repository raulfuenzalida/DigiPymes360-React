import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

export default function Inicio() {
    return (
        <main className="min-h-screen">
            <div className="container text-center mt-4" id="titulo">
                <h1><strong>Bienvenido a DigiPymes360</strong></h1>
                <h3>La vitrina digital para pequeñas y medianas empresas</h3>
            </div>

            <br />

            <section className="container my-4 d-flex justify-content-center">
                <div className="input-group" style={{ maxWidth: '500px' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar Productos..."
                        id="buscarInput"
                    />
                    <button
                        className="btn btn-primary"
                        type="button"
                        id="buscarButton"
                    >
                        Buscar
                    </button>
                </div>
            </section>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4" id="contenedorItems"></div>
        </main>
    );
}
