import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../components/Login";

describe("Login component", () => {
  it("debe permitir ingresar y enviar datos de login", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/correo@ejemplo\.com/i);
    const passwordInput = screen.getByPlaceholderText(/ingresa tu clave/i);
    const submitButton = screen.getByText(/iniciar sesión/i);

    fireEvent.change(emailInput, { target: { value: "b@b.b" } });
    fireEvent.change(passwordInput, { target: { value: "b" } });
    fireEvent.click(submitButton);

    expect(emailInput.value).toBe("b@b.b");
  });
});
