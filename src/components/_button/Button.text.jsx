import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Componente Button", () => {
    it("deve renderizar o button na tela e receber a prop type", () => {
        render(
            <Button
                type={"submit"}
            >
                Texto Button
            </Button>
        );

        const buttonElement = screen.getByRole("button", {name: "Texto Button"})

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveAttribute("type", "submit");
        expect(buttonElement).toHaveTextContent("Texto Button");
    });

    it("deve renderizar o button na tela e testar o clique do usuário", async() => {
        const user = userEvent.setup();

        const handleClickMock = vi.fn();

        render(
            <Button
                onClick={handleClickMock}
            >
                Texto Button
            </Button>
        );

        const buttonElement = screen.getByRole("button", {name: "Texto Button"});
        await user.click(buttonElement);

        expect(buttonElement).toBeInTheDocument();
        expect(handleClickMock).toHaveBeenCalledTimes(1);
    });
});