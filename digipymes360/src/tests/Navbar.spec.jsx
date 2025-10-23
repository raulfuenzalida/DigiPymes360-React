import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../components/Navbar";

// renderiza Navbar como ruta initial
const renderWithRouter = (initialRoute = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar />
    </MemoryRouter>
  );
};

describe("Navbar (DigiPymes360)", () => {
  test("muestra el logo y el enlace de la marca", () => {
    renderWithRouter("/");
    // El logo tiene alt="Logo" en el componente
    const logoImg = screen.getByRole("img", { name: /logo/i });
    expect(logoImg).toBeInTheDocument();
  });

  test("renderiza todos los enlaces principales", () => {
    renderWithRouter("/");
    expect(screen.getByRole("link", { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /registrarse/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sobre nosotros/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /mi perfil/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /compra/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /soporte/i })).toBeInTheDocument();
  });

  test("marca como activa la ruta actual usando NavLink", () => {
    renderWithRouter("/perfil");
    const perfilLink = screen.getByRole("link", { name: /mi perfil/i });
    // NavLink agrega 'active' cuando isActive === true
    expect(perfilLink).toHaveClass("active");
    // y suele exponer aria-current="page"
    expect(perfilLink).toHaveAttribute("aria-current", "page");
  });

  test("abre y cierra el menú colapsable con el botón (aria-expanded y clase 'show')", async () => {
    const user = userEvent.setup();
    renderWithRouter("/");

    const toggler = screen.getByLabelText(/toggle navigation/i);
    const collapse = screen.getByRole("navigation").querySelector("#navbarNav");

    expect(toggler).toHaveAttribute("aria-expanded", "false");
    expect(collapse).not.toHaveClass("show");

    // Abrir
    await user.click(toggler);
    expect(toggler).toHaveAttribute("aria-expanded", "true");
    expect(collapse).toHaveClass("show");

    // Cerrar al seleccionar un enlace
    const soporteLink = screen.getByRole("link", { name: /soporte/i });
    await user.click(soporteLink);
    expect(toggler).toHaveAttribute("aria-expanded", "false");
    expect(collapse).not.toHaveClass("show");
  });
});