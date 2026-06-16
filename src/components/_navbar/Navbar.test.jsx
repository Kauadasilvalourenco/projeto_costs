import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe("Componente Navbar", () => {
  
  it("deve renderizar a logo com o texto alternativo (alt) correto", () => {
    renderNavbar();
    const logoImg = screen.getByAltText("logo_costs");
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute("src");
  });

  it("deve exibir os links do menu com seus respectivos textos", () => {
    renderNavbar();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projetos")).toBeInTheDocument();
    expect(screen.getByText("Contato")).toBeInTheDocument();
    expect(screen.getByText("Empresa")).toBeInTheDocument();
  });

  it("deve alternar os ícones de menu hambúrguer ao clicar", () => {
    renderNavbar();

    const iconeAbrir = screen.getByTestId("botao-abrir");
    expect(iconeAbrir).toBeInTheDocument();

    fireEvent.click(iconeAbrir);

    const iconeFechar = screen.getByTestId("botao-fechar");
    expect(iconeFechar).toBeInTheDocument();

    expect(screen.queryByTestId("botao-abrir")).not.toBeInTheDocument();
  });

});