import Typography from "../../components/_typography/Typography";
import Input from "../../components/_input/Input";
import Select from "../../components/_select/Select";
import Form from "../../components/_form/Form";
// import components;

import styleCriarProjeto from "./CriarProjeto.module.css";
// import css;

function CriarProjeto() {
    const categorys = [
        {id: 1, nome: "Infra"},
        {id: 2, nome: "Planejamento"},
        {id: 3, nome: "Desenvolvimento"},
        {id: 4, nome: "Design"}
    ];

    const projectForm = [
        {
            label: {
                props: {
                    children: "Nome do Projeto: "
                }
            },
            field: {
                component: {
                    type: Input
                },
                props: {
                    name: "nome_projeto", type: "text", placeholder: "EX: Criação Landing Page"
                }
            }
        },
        {
            label: {
                props: {
                    children: "Orçamento do Projeto: "
                }
            },
            field: {
                component: {
                    type: Input
                },
                props: {
                    name: "orcamento_projeto", type: "number", placeholder: "EX: R$5000,00"
                }
            }
        },
        {
            label: {
                props: {
                    children: "Selecione uma Categoria: "
                }
            },
            field: {
                component: {
                    type: Select
                },
                props: {
                    name: "categoria_projeto", options: categorys
                }
            }
        }
    ]

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

            <Form 
                fieldsConfig={projectForm}
                btnText={"Criar Projeto"}
            />

        </div>
    )
}

export default CriarProjeto;