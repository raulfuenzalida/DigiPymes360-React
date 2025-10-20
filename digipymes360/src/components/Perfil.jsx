import { Link } from 'react-router-dom';
import gato_naranja from '../img/gato_naranja.jpg';
export default function Perfil() {
    return (
        <main className="min-h-screen">
        <form className="perfilUsuario" id="perfilUsuarioForm">
            <div className="mt-4">
                <h3 className="textoPerfil"><strong>Perfil de <span id="nombrePerfil"></span></strong></h3>
            </div>
            <div className="gato_naranja">
                <img src={gato_naranja} className="gato_naranja2 rounded-circle" alt="imagen de perfil" />
            </div>

            <div className="mb-3">
                <label for="emailTextInput" className="form-label textForm">Correo</label>
                <input type="email" id="emailTextInput" className="form-control" />
            </div>
            <div className="mb-3">
                <label for="addressTextInput" className="form-label textForm">Dirección</label>
                <input type="text" id="addressTextInput" className="form-control" />
            </div>

            <div className="mb-3">
                <label for="telefonoTextInput" className="form-label textForm">Teléfono</label>
                <input type="text" id="telefonoTextInput" className="form-control" />
            </div>


            <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
                <button type="submit" id="enviarBtn" className="btn btn-success px-5">Actualizar</button>
                <button type="button" id="cerrarSesionBtn" className="btn btn-danger px-5">Cerrar sesión</button>
            </div>
        </form>
    </main>
    )
}