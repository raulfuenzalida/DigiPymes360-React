import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

export default function LoginForm() {
  return (
    <main className="container d-flex justify-content-center align-items-start mt-5">
      <div className="col-12 col-sm-10 col-md-6 col-lg-4">
        <div className="p-4 border rounded bg-white shadow-sm">
          <div className="text-center mb-4">
            <img src={logo} alt="logo" style={{ width: '96px', height: '96px' }} />
          </div>

          <h4 className="text-center mb-4">Inicie sesión en DigiPymes360</h4>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Correo</label>
            <input
              type="email"
              id="userTextInput"
              className="form-control"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label htmlFor="passwordTextInput" className="form-label fw-bold m-0">Contraseña</label>
              <a href="#" className="small">Olvidé mi contraseña</a>
            </div>
            <input
              type="password"
              id="passwordTextInput"
              className="form-control"
              placeholder="Ingresa tu clave"
              required
            />
          </div>

          <div className="d-grid mb-3">
            <button type="button" id="loginBtn" className="btn btn-success">
              Iniciar Sesión
            </button>
          </div>

          <hr />

          <div className="text-center">
            <Link to="/registro" id="crear_cuenta" className="text-decoration-none">
              Crear una nueva cuenta
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
