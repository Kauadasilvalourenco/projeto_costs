import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom"; 
import Footer from "./Footer";

describe("Componente Footer", () => {
  
  it("deve renderizar a logo do projeto no footer", () => {
    render(<Footer />);

    const nomeMarca = screen.getByText("Costs");
    expect(nomeMarca).toBeInTheDocument();
  });

  it("deve renderizar os dois ícones de redes sociais", () => {
    const { container } = render(<Footer />);
    const iconesSvg = container.querySelectorAll("svg");
    
    expect(iconesSvg.length).toBe(2);
  });

});