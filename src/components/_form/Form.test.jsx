import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import z from "zod/v3";
import Form from "./Form";

describe("Componente Form", () => {
    it("deve renderizar o form na tela, verificar se as validações do zod estão funcionando corretamente e verificar se com os dados corretos o form é enviado", async() => {
        const user = userEvent.setup();
        const logSpy = vi.spyOn(console, "log")

        const mockSchema = [
            {
                label: {
                    props: {
                        children: "Texto Label",
                    }
                },
                field: {
                    component: {
                        type: "input"
                    },
                    props: {
                        name: "nome_input", placeholder: "Digite algo"
                    }
                }
            }
        ];

        const zodMock = z.object({
            nome_input: z.string()
            .min(1, "O campo não pode estar vazio")
            .max(30, "Quantidade máxima de caracteres atingida")
            .regex(/^(?!\d+$).+$/, "O nome do projeto não pode ser composto somente por números"),
        });

        render(
            <Form 
                fieldsConfig={mockSchema}
                schemaZod={zodMock}
                btnText={"Enviar"}
            />
        );

        const inputElement = screen.getByPlaceholderText("Digite algo");
        const labelElement = screen.getByLabelText("Texto Label");
        const buttonElement = screen.getByRole("button", {name: "Enviar"});

        expect(inputElement).toBeInTheDocument();
        expect(labelElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent("Enviar");

        await user.click(buttonElement);

        await waitFor(() => {
            expect(screen.getByText("O campo não pode estar vazio")).toBeInTheDocument();
        });

        await user.type(inputElement, "Alguma Coisa");
        await user.click(buttonElement);

        await waitFor(() => {
            expect(screen.queryByText("O campo não pode estar vazio")).not.toBeInTheDocument();
            expect(logSpy).toHaveBeenCalledWith("Dados do formulário prontos e validados")
        });

        logSpy.mockRestore();
    });
});