import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";


const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
const validarNumero = (num) => /^[0-9]{9,}$/.test(num);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Registro() {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [loading, setLoading] = useState(false);

    const registrar = async () => {
        const params = new URLSearchParams({ direccion, telefono });
        const url = `http://98.94.203.0:8080/api/v2/user/add?${params.toString()}`;

        const datos = {
            nombre: nombre,
            password: pass,
            email: email,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });

            return response;
        } catch (error) {
            console.error("Error en POST:", error);
            return false;
        }
    };


    const handleRegister = async () => {
        if (loading) return;
        setLoading(true);

        if (nombre.trim().length === 0) {
            alert("Debes ingresar un nombre de al menos una letra.");
            setLoading(false);
            return;
        }

        if (!validarCorreo(email)) {
            alert("El correo no es válido.");
            setLoading(false);
            return;
        }

        if (pass.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            setLoading(false);
            return;
        }

        if (pass !== pass2) {
            alert("Las contraseñas no coinciden.");
            setLoading(false);
            return;
        }

        if (direccion.trim().length < 10) {
            alert("Debes ingresar una dirección de al menos 10 letras.");
            setLoading(false);
            return;
        }

        if (!validarNumero(telefono)) {
            alert("Debes ingresar un teléfono válido (al menos 9 dígitos).");
            setLoading(false);
            return;
        }

        
        const v = await registrar();

        if (!v) {
            alert("Error en la petición.");
        } else if (!v.ok) {
            alert("Ya existe esta cuenta.");
        } else {
            alert("¡Te has registrado exitosamente!");
            limpiarCampos();
            navigate("/perfil");
        }

        await delay(200);
        setLoading(false);
    };

    
    const limpiarCampos = () => {
        setNombre("");
        setEmail("");
        setPass("");
        setPass2("");
        setDireccion("");
        setTelefono("");
    };

    
    return (
        <main className="min-vh-100 d-flex justify-content-center align-items-center">
            <div className="col-12 col-sm-10 col-md-6 col-lg-5">
                <div className="p-4 border rounded bg-white shadow-sm">
                    <div className="text-center mb-4">
                        <img src={logo} alt="logo" width="96" height="96" />
                    </div>

                    <h4 className="text-center mb-4">Registrarse en DigiPymes360</h4>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="userTextInput" className="form-label fw-bold">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="userTextInput"
                                className="form-control"
                                placeholder="Ingresa tu Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="emailTextInput" className="form-label fw-bold">
                                Correo
                            </label>
                            <input
                                type="email"
                                id="emailTextInput"
                                className="form-control"
                                placeholder="Ingresa tu Correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="passwordTextInput" className="form-label fw-bold">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="passwordTextInput"
                                className="form-control"
                                placeholder="Ingresa tu Clave"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="passwordTextInput2" className="form-label fw-bold">
                                Repetir Contraseña
                            </label>
                            <input
                                type="password"
                                id="passwordTextInput2"
                                className="form-control"
                                placeholder="Repite tu Clave"
                                value={pass2}
                                onChange={(e) => setPass2(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="addressTextInput" className="form-label fw-bold">
                                Dirección
                            </label>
                            <input
                                type="text"
                                id="addressTextInput"
                                className="form-control"
                                placeholder="Ingresa tu Dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phoneTextInput" className="form-label fw-bold">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                id="phoneTextInput"
                                className="form-control"
                                placeholder="Ingresa tu Número de teléfono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>

                        <div className="d-grid mb-3">
                            <button
                                type="button"
                                id="registerBtn"
                                className="btn btn-success"
                                onClick={handleRegister}
                                disabled={loading}
                            >
                                {loading ? "Registrando..." : "Registrarse"}
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
