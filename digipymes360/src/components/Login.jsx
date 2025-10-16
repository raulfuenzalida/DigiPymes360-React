import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

export default function Inicio() {
    return (
        <main className="container my-5 min-h-screen">
        <div className="row justify-content-center">



            <div className="loginUsuario mt-4">

                <div id="logo_login">
                    <img src={logo} alt="logo"  style={{ width:"96px", height:"96px"}}/>
                </div>

                <h3 className="text-black text-center mt-4 mb-4">Inicie sesión en DigiPymes360</h3>
                <div className="mb-3">
                    <label for="email" className="form-label textForm">Correo</label>
                    <input type="email" id="userTextInput" className="form-control" placeholder="correo@ejemplo.com"
                        required/>


                </div>

                <div className="mb-4">
                    <div className="conteiner_password">
                        <label for="passwordInput" className="form-label"><strong>Contraseña</strong></label><a
                            href="#">Olvidé mi contraseña</a>
                    </div>
                    <input type="password" id="passwordTextInput" className="form-control" placeholder="Ingresa tu clave"
                        required/>
                </div>


                <div className="d-flex justify-content-center mb-2">
                    <button type="button" id="loginBtn" className="btn btn-success px-5">Iniciar Sesión</button>
                </div>
                <hr/>
                <div className="d-flex justify-content-center mb-4 ">
                    <a id="crear_cuenta" href="registro.html">Crear una nueva cuenta</a>
                </div>
            </div>

        </div>
    </main>
    )
}