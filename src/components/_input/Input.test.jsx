import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Componente Input", () => {
    it("deve renderizar o input na tela e receber as props", () => {
        render(
            <Input 
                type="text"
                name="input_component"
                placeholder="Digite Aqui"
            />
        );

        const inputElement = screen.getByPlaceholderText("Digite Aqui");

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute("type", "text");
        expect(inputElement).toHaveAttribute("name", "input_component");
        expect(inputElement).toHaveAttribute("placeholder", "Digite Aqui");
    });
});