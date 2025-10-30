import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../img/logo.png";
import loadingGif from "../img/loading.gif";

const validarCorreo = (correo) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
};


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const consultarApi = async () => {
    const params = new URLSearchParams({ email, password });
    const url = `http://98.94.203.0:8080/api/v2/user/loginDP360?${params.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) return false;
      return await response.json();
    } catch (error) {
      console.error("Error en fetch:", error);
      return false;
    }
  };

  const consultarApiDatosUsuario = async () => {
    const params = new URLSearchParams({ email, password });
    const url = `http://98.94.203.0:8080/api/v2/user/loginINFO?${params.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) return false;
      return await response.json();
    } catch (error) {
      console.error("Error en fetch:", error);
      return false;
    }
  };



  const handleLogin = async () => {
    if (loading) return; // evitar doble click
    setLoading(true);

    if (!validarCorreo(email)) {
      alert("El correo no es válido");
      setLoading(false);
      return;
    }

    console.log("Iniciando sesión con:", { email, password });

    const v = await consultarApi();

    console.log("Respuesta loginDP360:", v);

    if (v === false) {
      alert("Credenciales no válidas");
      localStorage.setItem("Logged", "false");
      setLoading(false);
      return;
    }

    alert("Has iniciado sesión correctamente");
    localStorage.setItem("Logged", "true");

    const u = await consultarApiDatosUsuario();
    console.log("Respuesta loginINFO:", u);

    if (u && typeof u === "object" && u.id_usuario != null) {
      localStorage.setItem("UserData", JSON.stringify(u));
      console.log("Datos guardados en localStorage:", u);
    } else {
      console.error("No se pudieron obtener datos válidos del usuario:", u);
      alert("Error: no se pudieron obtener los datos del usuario.");
    }

    setLoading(false);
    navigate("/perfil");
  };


  return (
    <main className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="col-12 col-sm-10 col-md-6 col-lg-4">
        <div className="p-4 border rounded bg-white shadow-sm">
          <div className="text-center mb-4">
            <img src={logo} alt="logo" style={{ width: "96px", height: "96px" }} />
          </div>

          <h4 className="text-center mb-4">Inicie sesión en DigiPymes360</h4>

          <div className="mb-3">
            <label htmlFor="userTextInput" className="form-label fw-bold">
              Correo
            </label>
            <input
              type="email"
              id="userTextInput"
              className="form-control"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label htmlFor="passwordTextInput" className="form-label fw-bold m-0">
                Contraseña
              </label>
              <a href="#" className="small">
                Olvidé mi contraseña
              </a>
            </div>
            <input
              type="password"
              id="passwordTextInput"
              className="form-control"
              placeholder="Ingresa tu clave"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid mb-3">
            <button
              type="button"
              id="loginBtn"
              className="btn btn-success"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <img
                  src={loadingGif}
                  alt="Cargando..."
                  style={{ width: "30px", height: "30px" }}
                />
              ) : (
                "Iniciar Sesión"
              )}
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
