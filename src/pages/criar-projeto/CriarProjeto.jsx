import { useId } from "react";
// import react;

import Typography from "../../components/_typography/Typography";
import Label from "../../components/_label/Label";
import Input from "../../components/_input/Input";
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
                <div className="conteiner_nome_projeto">
                    <Label
                        htmlFor={`${ID}-nome_projeto`}
                    >
                        Nome do Projeto:
                    </Label>
                    <Input 
                      type={"text"}
                      name={`${ID}-nome_projeto`}
                      id={`${ID}-nome_projeto`}
                      placeholder={"Ex: Criação de Landing Page"}
                    />
                </div>
            </form>

        </div>
    )
}

export default CriarProjeto;