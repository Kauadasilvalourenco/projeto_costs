import { describe, it, expect } from "vitest";
import { formSchema } from "./formSchema";

describe("Função formSchema", () => {
    it("deve estruturar um formulário utilizando componentes anatomicos e passar seus atributos via props", () => {
        const ID = ":r0:!"
        
        const formMock = [
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
                        name: "nome_input", placeholder: "digite um texto"
                    }
                }
            }
        ]

        const expectedID = `${ID}-${"nome_input"}`
        const schemaMock = formSchema(formMock, ID)
        
        expect(schemaMock).toHaveLength(1);
        expect(schemaMock[0].field.props.name).toBe("nome_input");
        expect(schemaMock[0].field.props.placeholder).toBe("digite um texto");
        expect(schemaMock[0].field.props.id).toBe(expectedID);
        expect(schemaMock[0].label.props.htmlFor).toBe(expectedID);
        expect(schemaMock[0].label.props.children).toBe("Texto Label")
    });
});