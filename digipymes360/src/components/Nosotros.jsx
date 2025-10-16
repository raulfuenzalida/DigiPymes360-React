import { Link } from 'react-router-dom';
import Intercambio from '../img/intercambio.png';

export default function Nosotros() {
    return (
        <main class="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 bg-dp360-light p-4 rounded shadow">
                    <h4 className="text-white">Bienvenid@ a la página principal</h4>
                    <h3 className="text-white">Acerca de Nosotros</h3>
                    <p className="text-light">
                        <a style={{ color: 'rgba(236,117,61,1.0)' }}>DigiPymes360</a> es una empresa emergente dedicada a la
                        transformación digital de pequeñas y medianas empresas (pymes). Con el creciente avance del comercio
                        digital, muchas pymes han encontrado dificultades para adaptarse a las nuevas exigencias del
                        mercado. DigiPymes360 busca solucionar este problema ofreciendo una plataforma integral a modo de
                        vitrina, que permita a las pymes mostrar sus productos, mejorando la experiencia de compra de los
                        clientes al interactuar con las pymes y facilitando la toma de decisiones mediante herramientas
                        digitales avanzadas.
                    </p>

                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center">
                            <img
                                className="img-fluid"
                                src={Intercambio}
                                alt="Mercado"
                                style={{ maxWidth: '128px', height: 'auto' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
