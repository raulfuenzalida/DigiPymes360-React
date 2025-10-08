import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header style={{ width: "100%", margin: 0, padding: 0 }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dp360">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Logo" className="logo-dp360" style={{ height: '40px' }} />
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"><Link className="nav-link active" to="/">Inicio</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/registro">Registrarse</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/nosotros">Sobre nosotros</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/perfil">Mi Perfil</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/compra">Compra</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/soporte">Soporte</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
