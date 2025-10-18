import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function Soporte() {
    const [form, setForm] = useState({
        nombreCompleto: "",
        correo: "",
        telefono: "",
        mensaje: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(
            `Mensaje enviado:\n\nNombre: ${form.nombreCompleto}\nCorreo: ${form.correo}\nTeléfono: ${form.telefono}\nMensaje: ${form.mensaje}`
        );
    };
    return (
        <main className="container my-4" style={{ minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="registroUsuario">
          <h3 className="mt-3">
            <strong className="row justify-content-center">¿Experimentando algún problema? ¡Podemos ayudar!</strong>
          </h3>
          <div className="d-flex justify-content-center">
            <h5>
            Nuestro equipo de soporte está aquí para ayudarte a resolver
            cualquier problema que puedas estar experimentando con nuestro
            sistema.
          </h5>
          </div>
          

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="nombreCompleto"
                className="form-label textForm"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombreCompleto"
                className="form-control"
                placeholder="Ingresa tu Nombre"
                value={form.nombreCompleto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label textForm">
                Correo
              </label>
              <input
                type="email"
                id="correo"
                className="form-control"
                placeholder="Ingresa tu Correo"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label textForm">
                Teléfono
              </label>
              <input
                type="text"
                id="telefono"
                className="form-control"
                placeholder="Ingresa tu Teléfono"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">
                Mensaje
              </label>
              <textarea
                className="form-control"
                id="mensaje"
                rows="3"
                placeholder="Escribe tu mensaje..."
                value={form.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success">
                Enviar
              </button>
            </div>
            <hr />
          </form>
        </div>
      </div>
    </main>
    )
}