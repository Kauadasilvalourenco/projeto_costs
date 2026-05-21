import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom"; // Garante os matchers como .toBeInTheDocument()
import Footer from "./Footer";

describe("Componente Footer", () => {
  
  it("deve renderizar o texto de direitos autorais com o nome da marca", () => {
    render(<Footer />);

    // Verifica se o nome em destaque "Costs" está renderizado
    const nomeMarca = screen.getByText("Costs");
    expect(nomeMarca).toBeInTheDocument();

    // Verifica se o texto do ano/copyright está presente (usando regex para ignorar espaços ou o símbolo ©)
    const textoCopyright = screen.getByText(/2021/);
    expect(textoCopyright).toBeInTheDocument();
  });

  it("deve renderizar os três ícones de redes sociais", () => {
    // Renderiza o componente
    const { container } = render(<Footer />);

    // Como os ícones de bibliotecas externas (react-icons) geram tags <svg> puras,
    // a forma mais segura e limpa de testá-los no DOM é checando se os nós <svg> estão lá dentro do container de ícones
    const iconesSvg = container.querySelectorAll("svg");
    
    // Garante que o componente renderizou exatamente os 3 ícones que você colocou (Instagram, Whatsapp, Linkedin)
    expect(iconesSvg.length).toBe(3);
  });

});