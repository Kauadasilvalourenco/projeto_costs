import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import FlashMessage from "./FlashMessage";
import styleFlashMessage from "./FlashMessage.module.css";
import { MessageContext } from "../../context/MessageContext";
import userEvent from "@testing-library/user-event";

describe("FlashMessage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it("deve retornar um erro referente ao componente estar fora do provider", () => {
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        expect(() => {
            render(
                <FlashMessage />
            );
        }).toThrow("useMessage só pode ser usado em um MessageProvider");

        consoleSpy.mockRestore();
    });

    it("não deve renderizar a mensagem quando seu valor for null", () => {
        const mockContext = {
            message: null,
            typeMessage: ""
        }

        render(
            <MessageContext.Provider
                value={mockContext}
            >
                <FlashMessage />
            </MessageContext.Provider>
        );

        const message = screen.queryByText("Teste Sucesso!");

        expect(message).not.toBeInTheDocument();
    });

    it("deve renderizar uma mensagem de sucesso", () => {
        const mockContext = {
            message: "Teste Sucesso!",
            typeMessage: "success",
        };

        render(
            <MessageContext.Provider
                value={mockContext}
            >
                <FlashMessage />
            </MessageContext.Provider>
        );

        const messageSuccess = screen.getByTestId("flash-message");

        expect(messageSuccess).toHaveClass(styleFlashMessage.success);
    });

    it("deve renderizar uma mensagem de erro", () => {
        const mockContext = {
            message: "Teste Erro!",
            typeMessage: "error"
        };

        render(
            <MessageContext.Provider
                value={mockContext}
            >
                <FlashMessage />
            </MessageContext.Provider>
        );

        const messageError = screen.getByTestId("flash-message");

        expect(messageError).toHaveClass(styleFlashMessage.error)
    });

    it("deve fechar a mensagem quando o usuário clicar no button x", async() => {
        const mockContext = {
            message: "Teste Sucesso!",
            typeMessage: "success",
            closeMessage: vi.fn()
        };

        const user = userEvent.setup();

        render(
            <MessageContext.Provider
                value={mockContext}
            >
                <FlashMessage />
            </MessageContext.Provider>
        );

        const messageSuccess = screen.getByText("Teste Sucesso!");
        const buttonCloseMessage = screen.getByRole("button", {
            name: "Fechar Mensagem"
        });

        expect(messageSuccess).toBeInTheDocument();

        await user.click(buttonCloseMessage);

        expect(mockContext.closeMessage).toHaveBeenCalled();
    });

});