import { useId } from "react";
// import react;

import Typography from "../../components/_typography/Typography";
import Label from "../../components/_label/Label";
// import components;

function CriarProjeto() {
    const ID = useId();

    return(
        <div>

            <Typography
                tag={"h1"}
            >
                Criar Projeto
            </Typography>

            <Typography
                tag={"p"}
            >
                Crie seu projeto para depois adicionar os serviços!
            </Typography>

            <form>
                <Label 
                    htmlFor={`${ID}-nome_projeto`}
                >
                    Nome do Projeto:
                </Label>
            </form>

        </div>
    )
}

export default CriarProjeto;