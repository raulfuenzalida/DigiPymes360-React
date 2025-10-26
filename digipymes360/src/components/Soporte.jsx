import { useState } from "react";

export default function Soporte() {
  const [form, setForm] = useState({
    nombreCompleto: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  
  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const validarNumero = (num) => /^[0-9]{8,}$/.test(num);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const limpiar = () => {
    setForm({
      nombreCompleto: "",
      correo: "",
      telefono: "",
      mensaje: "",
    });
  };

  const subirSoporte = async (nombre, correo, telefono, mensaje) => {
    const url = `http://54.236.21.136:8080/api/v2/support/add?id_cliente=1`;

    const datos = {
      mensaje:
        `Correo: ${correo}\r\nTeléfono: ${telefono}\r\nNombre: ${nombre}\r\nMensaje: ${mensaje}`,
      estado: "No resuelto",
      fecha: new Date().toISOString(),
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombreCompleto, correo, telefono, mensaje } = form;

    // Validaciones
    if (nombreCompleto.length < 1) {
      alert("Debes ingresar un nombre de al menos 1 caracter");
      return;
    }
    if (!validarCorreo(correo)) {
      alert("El correo no es válido");
      return;
    }
    if (!validarNumero(telefono)) {
      alert("Debes ingresar un teléfono de al menos 8 dígitos.");
      return;
    }
    if (mensaje.length < 10) {
      alert("Debes ingresar un mensaje de al menos 10 carácteres.");
      return;
    }

    const respuesta = await subirSoporte(nombreCompleto, correo, telefono, mensaje);

    if (!respuesta) {
      alert("Error en la petición de SOPORTE.");
    } else if (!respuesta.ok) {
      alert("No se pudo procesar tu solicitud.");
      limpiar();
    } else {
      limpiar();
      alert("¡Gracias por escribir un soporte, esperamos solucionar pronto tu problema!");
      window.location.href = "/";
    }
  };

  return (
    <main className="container my-4" style={{ minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="registroUsuario col-md-8 col-lg-6">
          <h3 className="mt-3 text-center">
            <strong>¿Experimentando algún problema? ¡Podemos ayudar!</strong>
          </h3>
          <h5 className="text-center mb-4">
            Nuestro equipo de soporte está aquí para ayudarte a resolver
            cualquier problema que puedas estar experimentando con nuestro sistema.
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombreCompleto" className="form-label textForm">
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
          </form>
        </div>
      </div>
    </main>
  );
}
