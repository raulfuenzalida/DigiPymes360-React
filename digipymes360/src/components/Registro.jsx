import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

export default function Registro() {
    return (
        <main className="container d-flex justify-content-center align-items-start mt-5">
            <div className="col-12 col-sm-10 col-md-6 col-lg-5">
                <div className="p-4 border rounded bg-white shadow-sm">
                    <div className="text-center mb-4">
                        <img src={logo} alt="logo" width="96" height="96" />
                    </div>

                    <h4 className="text-center mb-4">Registrarse en DigiPymes360</h4>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="userTextInput" className="form-label fw-bold">Nombre</label>
                            <input
                                type="text"
                                id="userTextInput"
                                className="form-control"
                                placeholder="Ingresa tu Nombre"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="emailTextInput" className="form-label fw-bold">Correo</label>
                            <input
                                type="email"
                                id="emailTextInput"
                                className="form-control"
                                placeholder="Ingresa tu Correo"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="passwordTextInput" className="form-label fw-bold">Contraseña</label>
                            <input
                                type="password"
                                id="passwordTextInput"
                                className="form-control"
                                placeholder="Ingresa tu Clave"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="passwordTextInput2" className="form-label fw-bold">Repetir Contraseña</label>
                            <input
                                type="password"
                                id="passwordTextInput2"
                                className="form-control"
                                placeholder="Repite tu Clave"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="addressTextInput" className="form-label fw-bold">Dirección</label>
                            <input
                                type="text"
                                id="addressTextInput"
                                className="form-control"
                                placeholder="Ingresa tu Dirección"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phoneTextInput" className="form-label fw-bold">Teléfono</label>
                            <input
                                type="text"
                                id="phoneTextInput"
                                className="form-control"
                                placeholder="Ingresa tu Número de teléfono"
                            />
                        </div>

                        <div className="d-grid mb-3">
                            <button type="button" id="registerBtn" className="btn btn-success">
                                Registrarse
                            </button>
                        </div>

                        <hr />

                        <div className="text-center">
                            <Link to="/login" id="crear_cuenta" className="text-decoration-none">
                                ¿Ya tienes cuenta? Inicia sesión aquí
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
