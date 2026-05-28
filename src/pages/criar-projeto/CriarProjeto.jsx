import { useId } from "react";
// import react;

import Typography from "../../components/_typography/Typography";
import Label from "../../components/_label/Label";
import Input from "../../components/_input/Input";
import Select from "../../components/_select/Select";
import Button from "../../components/_button/Button";
// import components;

import styleCriarProjeto from "./CriarProjeto.module.css";
// import css;

function CriarProjeto() {
    const categorias = [
        {id: 1, nome: "Infra"},
        {id: 2, nome: "Planejamento"},
        {id: 3, nome: "Desenvolvimento"},
        {id: 4, nome: "Design"}
    ];

    const ID = useId();

    function criarProjeto(e) {
        e.preventDefault();
    }

    return(
        <div className={styleCriarProjeto.CriarProjeto}>

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

                <div className={styleCriarProjeto.conteiner_nome_projeto}>
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

                <div className={styleCriarProjeto.conteiner_orcamento_projeto}>
                    <Label
                        htmlFor={`${ID}-orcamento_projeto`}
                    >
                        Orçamento do Projeto:
                    </Label>
                    <Input 
                      type={"number"}
                      name={`${ID}-orcamento_projeto`}
                      id={`${ID}-orcamento_projeto`}
                      placeholder={"Ex: R$5000,00"}
                    />
                </div>

                <div className={styleCriarProjeto.conteiner_categorias_projeto}>
                    <Label
                        htmlFor={`${ID}-categorias_projeto`}
                    >
                        Selecione a Categoria:
                    </Label>
                    <Select 
                        name={`${ID}-categorias_projeto`}
                        id={`${ID}-categorias_projeto`}
                        options={categorias}
                    />
                </div>

                <Button
                    type={"submit"}
                    onClick={criarProjeto}
                    children={"Criar Projeto"}
                />

            </form>

        </div>
    )
}

export default CriarProjeto;