import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";

describe("Componente Select", () => {
    it("deve renderizar o select na tela e receber as props", () => {
        render(
            <Select
                name="select_component"
                id="id_unico"
            >
            </Select>
        );

        const selectElement = screen.getByRole("combobox");

        expect(selectElement).toBeInTheDocument();
        expect(selectElement).toHaveAttribute("name", "select_component");
        expect(selectElement).toHaveAttribute("id", "id_unico");
    });

    it("deve renderizar o select e verificar o valor das options", async() => {
        const user = userEvent.setup();
        
        render(
            <Select>
                <option value="opt01">opt01</option>
                <option value="opt02">opt02</option>
            </Select>
        );

        const selectElemnt = screen.getByRole("combobox");

        await user.click(selectElemnt);

        const options = screen.getAllByRole("option");
    
        expect(selectElemnt).toBeInTheDocument();
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveTextContent("opt01");
        expect(options[1]).toHaveTextContent("opt02");
    });
});