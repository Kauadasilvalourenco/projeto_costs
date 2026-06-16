import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Label from "./Label";

describe("Componente Label", () => {
    it("deve renderizar o label na tela e receber as props", () => {
        render(
            <Label
                htmlFor="id_unico"
            >
                Label
            </Label>
        );

        const labelElement = screen.getByText("Label");

        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveTextContent("Label");
        expect(labelElement).toHaveAttribute("for", "id_unico")
    });
});