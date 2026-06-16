import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    it("deve renderizar o input na tela e verificar se o value é igual ao texto digitado pelo usuário", async() => {
        const user = userEvent.setup();

        render(
            <Input 
                placeholder="Digite um texto"
            />
        );

        const inputElement = screen.getByPlaceholderText("Digite um texto");
        await user.type(inputElement, "Texto digitado")

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue("Texto digitado");
    });
});