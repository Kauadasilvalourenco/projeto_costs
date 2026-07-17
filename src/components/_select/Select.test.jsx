import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";

describe("Componente Select", () => {
    it("deve renderizar o select na tela e receber as props", () => {
        const mockOptions = [
            {id: "opt01", name: "opt01"},
            {id: "opt02", name: "opt02"}
        ];

        render(
            <Select
                name="select_component"
                id="id_unico"
                options={mockOptions}
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
        const mockOptions = [
            {id: "opt01", name: "opt01"},
            {id: "opt02", name: "opt02"}
        ];
        
        render(
            <Select 
                options={mockOptions}
            />
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