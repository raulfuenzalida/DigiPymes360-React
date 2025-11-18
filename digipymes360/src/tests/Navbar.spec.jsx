import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

const renderWithRouter = (initialRoute = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar />
    </MemoryRouter>
  );
};

describe("Navbar (DigiPymes360)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("muestra el logo correctamente", () => {
    renderWithRouter("/");
    const logo = screen.getByRole("img", { name: /logo/i });
    expect(logo).toBeInTheDocument();
  });

  test("renderiza enlaces cuando usuario NO está logueado", () => {
    localStorage.setItem("Logged", "false");
    renderWithRouter("/");

    // Enlaces visibles
    expect(screen.getByRole("link", { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /registrarse/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /compra/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sobre nosotros/i })).toBeInTheDocument();

    // Enlaces que NO deben aparecer
    expect(screen.queryByRole("link", { name: /mi perfil/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /soporte/i })).toBeNull();
  });

  test("renderiza enlaces cuando usuario SÍ está logueado", () => {
    localStorage.setItem("Logged", "true");
    renderWithRouter("/");


    expect(screen.getByRole("link", { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /mi perfil/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /soporte/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /compra/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sobre nosotros/i })).toBeInTheDocument();


    expect(screen.queryByRole("link", { name: /login/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /registrarse/i })).toBeNull();
  });

  test("marca como activa la ruta actual con NavLink", () => {
    localStorage.setItem("Logged", "true");
    renderWithRouter("/perfil");
    const perfilLink = screen.getByRole("link", { name: /mi perfil/i });
    expect(perfilLink).toHaveClass("active");
    expect(perfilLink).toHaveAttribute("aria-current", "page");
  });

  test("abre y cierra el menú colapsable correctamente", async () => {
    const user = userEvent.setup();
    localStorage.setItem("Logged", "false");
    renderWithRouter("/");

    const toggler = screen.getByLabelText(/toggle navigation/i);
    const collapse = screen.getByRole("navigation").querySelector("#navbarNav");


    expect(toggler).toHaveAttribute("aria-expanded", "false");
    expect(collapse).not.toHaveClass("show");


    await user.click(toggler);
    expect(toggler).toHaveAttribute("aria-expanded", "true");
    expect(collapse).toHaveClass("show");


    const inicioLink = screen.getByRole("link", { name: /inicio/i });
    await user.click(inicioLink);
    expect(toggler).toHaveAttribute("aria-expanded", "false");
    expect(collapse).not.toHaveClass("show");
  });
});
