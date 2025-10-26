import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Soporte from "../components/Soporte";

beforeEach(() => {
  // Mocks
  global.fetch = async () => ({ ok: true });

  window.alert = () => {};
  window.location = { href: "" };

  HTMLFormElement.prototype.checkValidity = () => true;
});

describe("Soporte (Formulario de ayuda)", () => {
  test("renderiza todos los inputs y el botón enviar", () => {
    render(<Soporte />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  test("valida formulario y muestra alerta si el nombre está vacío", async () => {
    let alertMsg = "";
    window.alert = (msg) => (alertMsg = msg);

    const user = userEvent.setup();
    render(<Soporte />);

    
    await user.type(screen.getByLabelText(/correo/i), "test@example.com");
    await user.type(screen.getByLabelText(/teléfono/i), "12345678");
    await user.type(screen.getByLabelText(/mensaje/i), "Mensaje de prueba válido");

    
    const button = screen.getByRole("button", { name: /enviar/i });
    const form = button.closest("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(alertMsg).toBe("Debes ingresar un nombre de al menos 1 caracter");
    });
  });

  test("envía el formulario correctamente y muestra mensaje de éxito", async () => {
    let alertMsg = "";
    window.alert = (msg) => (alertMsg = msg);

    const user = userEvent.setup();
    render(<Soporte />);

    await user.type(screen.getByLabelText(/nombre/i), "Juan Pérez");
    await user.type(screen.getByLabelText(/correo/i), "juan@example.com");
    await user.type(screen.getByLabelText(/teléfono/i), "12345678");
    await user.type(screen.getByLabelText(/mensaje/i), "Este es un mensaje válido y largo");

    const button = screen.getByRole("button", { name: /enviar/i });
    const form = button.closest("form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(alertMsg).toBe(
        "¡Gracias por escribir un soporte, esperamos solucionar pronto tu problema!"
      );
    });

    expect(window.location.href).toBe("/");
  });
});
