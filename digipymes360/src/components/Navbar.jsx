import logo from '../assets/logo.png'

export default function Navbar() {
    return (
        <>
            <header>
                <nav class="navbar navbar-expand-lg bg-dp360" data-bs-theme="dark">
                    <div class="container-fluid">
                        <a class="navbar-brand " href="#"><img src={logo} alt="Logo" class="logo-dp360" /></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link " id="loginActive" href="login.html">Login </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="registerActive" href="registro.html">Registrarse</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="nosotros.html">Sobre nosotros</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link  " id1="miPerfil" href="perfil.html" id2="miPerfil">Mi Perfil</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link " href="compra.html">Compra</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="soporte.html">Soporte</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </header >
        </>
    )
}

