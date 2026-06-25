import z from "zod/v3";
// import zod;

import Typography from "../../components/_typography/Typography";
import Input from "../../components/_input/Input";
import Select from "../../components/_select/Select";
import Form from "../../components/_form/Form";
// import components;

import { createProject } from "../../services/api";
// import js;

import styleCriarProjeto from "./CriarProjeto.module.css";
// import css;

function CriarProjeto() {
    async function handleCreateProject(project) {
        try {
            await createProject(project);
            console.log("Projeto criado com sucesso!");
        } catch (error) {
            console.error(`Erro ao criar projeto: ${error}`);
        }
    }

    const validationProject = z.object({
        nome_projeto: z.string()
        .min(1, "O campo não pode ser nulo!")
        .max(30)
        .regex(/^(?!\d+$).+$/, "O nome do projeto não pode ser composto somente por números"),

        orcamento_projeto: z.coerce.number()
        .min(1, "O campo não pode ser nulo!"),

        categoria_projeto: z.string()
        .min(1, "É preciso selecionar uma categoria!")
    });

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
                    name: "categoria_projeto",
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
                schemaZod={validationProject}
                onSubmit={handleCreateProject}
            />

        </div>
    )
}

export default CriarProjeto;