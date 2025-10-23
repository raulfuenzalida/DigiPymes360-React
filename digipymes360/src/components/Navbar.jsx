import logo from '../img/logo.png';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const logged = localStorage.getItem("Logged");

  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(o => !o);
  const closeMenu = () => setOpen(false);

  return (
    <header style={{ width: "100%", margin: 0, padding: 0 }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dp360">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={closeMenu}>
            <img src={logo} alt="Logo" className="logo-dp360" style={{ height: '40px' }} />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                  Inicio
                </NavLink>
              </li>

              {logged === null || logged.toLowerCase().includes("false") ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/registro" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                      Registrarse
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/perfil" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                      Mi Perfil
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/soporte" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                      Soporte
                    </NavLink>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink to="/compra" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                  Compra
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/nosotros" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                  Sobre nosotros
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
