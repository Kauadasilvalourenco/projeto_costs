import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom"; 
import Footer from "./Footer";

describe("Componente Footer", () => {
  
  it("deve renderizar o texto de direitos autorais com o nome da marca", () => {
    render(<Footer />);

    const nomeMarca = screen.getByText("Costs");
    expect(nomeMarca).toBeInTheDocument();

    const textoCopyright = screen.getByText(/2021/);
    expect(textoCopyright).toBeInTheDocument();
  });

  it("deve renderizar os três ícones de redes sociais", () => {
    const { container } = render(<Footer />);
    const iconesSvg = container.querySelectorAll("svg");
    
    expect(iconesSvg.length).toBe(3);
  });

});