import { useState, useEffect } from "react";
// import hooks;

import { useParams } from "react-router-dom";
// import router;

import Typography from "../../components/_typography/Typography";
import Form from "../../components/_form/Form";
import Input from "../../components/_input/Input";
import Select from "../../components/_select/Select";
import Button from "../../components/_button/Button";
import Card from "../../components/_card/Card";
// import components;

import z from "zod/v3";
// import zod;

import { getProject, getCategories, getServices, createServices, editProject } from "../../services/api";
// import js;

import styleEditProject from "./EditProject.module.css";
// import css;

function EditProject() {
    const [project, setProject] = useState(null);
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);

    const [projectVisable, setProjectVisable] = useState(true);
    const [serviceVisabel, setServiceVisable] = useState(false);

    const [totalUtilizado, setTotalUtilizado] = useState(0);
    const { id } = useParams();
    

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getProject(id);
                setProject(data);
            } catch (error) {
                console.error(`Erro ao acessar o projeto: ${error}`);
            }
        };

        fetchData();

    }, [id]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error(`Erro ao acessar as categorias: ${error}`);
            }
        };

        fetchData();

    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getServices(id);
                setServices(data);
                console.log(data);
            } catch (error) {
                console.error(`Erro ao acessar os serviços: ${error}`);
            }
        };

        fetchData();

    }, [id])

    async function handleEditProject(dataProject) {
        try {
            await editProject(project.id, dataProject);
            console.log("Projeto editado com sucesso!");
        } catch (error) {
            console.error(`Erro ao editar o projeto: ${error}`);
        }
    };

    async function handleCreateServices(service) {
        try {
            await createServices(project.id, service);
            setServiceVisable(!serviceVisabel);
            console.log("Serviço criado com sucesso!");
        } catch (error) {
            console.error(`Erro ao criar o serviço: ${error} `);
        }
    }

    function toogleForm() {
        setProjectVisable(!projectVisable);
    };

    function toogleService() {
        setServiceVisable(!serviceVisabel);
    };

    
    if (project === null) {
        return "Carregando..."
    };

    const editFields = [
        {
            label: {
                props: {
                    children: "Nome do Projeto:"
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
                    children: "Orçamento do Projeto:"
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
                    children: "Selecione uma Categoria"
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
    ];

    const validationEditProject = z.object({
        nome_projeto: z.string()
        .min(1, "O campo não pode ser nulo!")
        .regex(/^(?!\d+$).+$/, "O nome do projeto não pode ser composto somente por números"),

        orcamento_projeto: z.coerce.number()
        .min(1, "O campo não pode ser nulo!"),

        categoria_projeto: z.string()
        .min(1, "É preciso selecionar uma categoria")
    });

    const addServices = [
        {
            label: {
                props: {
                    children: "Nome do Serviço:"
                }
            },
            field: {
                component: {
                    type: Input
                },
                props: {
                    name: "nome_servico", type: "text", placeholder: "EX: Contratar Dev Front-End"
                }
            }
        },

        {
            label: {
                props: {
                    children: "Custo do Serviço:"
                }
            },
            field: {
                component: {
                    type: Input
                },
                props: {
                    name: "custo_servico", type: "number", placeholder: "EX: R$3500,00"
                }
            }
        }
    ];

    const validationAddService = z.object({
        nome_servico: z.string()
        .min(1, "O campo não pode ser nulo!")
        .regex(/^[^0-9]*$/, "O nome não pode conter números!"),

        custo_servico: z.coerce.number()
        .min(1, "O campo não pode ser nulo!")
    });

    return(
        <div className={styleEditProject.page_edit_project}>
            
            {
                projectVisable === true ? (
                    <section className={styleEditProject.section_edit_project}>

                        <Typography
                            tag={"h1"}
                        >
                            Projeto: {project.nome_projeto}
                        </Typography>

                        <Typography
                            tag={"p"}
                        >
                            Categoria: {project.categoria_projeto}
                        </Typography>

                        <Typography>
                            Orçamento: R${project.orcamento_projeto.toFixed(2).replace(".", ",")}
                        </Typography>

                        <Typography>
                            Total Utilizado: R${totalUtilizado.toFixed(2).replace(".", ",")}
                        </Typography>

                        <Button
                            onClick={toogleForm}
                        >
                            Editar Projeto
                        </Button>

                    </section>
                ) : (
                    <Form 
                        fieldsConfig={editFields}
                        schemaZod={validationEditProject}
                        onCategories={categories}
                        btnText={"Salvar"}
                        formData={project}
                        onSubmit={handleEditProject}
                    />
                )
            }

            <hr />

            {
                serviceVisabel === false ? (
                    <section className={styleEditProject.section_add_service}>

                        <Typography
                            tag={"h2"}
                        >
                            Adicione um Serviço:
                        </Typography>

                        <Button
                            onClick={toogleService}
                        >
                            Adiconar Serviço
                        </Button>

                    </section>
                ): (
                    <Form 
                        fieldsConfig={addServices}
                        schemaZod={validationAddService}
                        btnText={"Criar Serviço"}
                        onSubmit={handleCreateServices}
                    />
                )
            }

            <hr />

            <section className={styleEditProject.section_services}>
                <Typography
                    tag={"h2"}
                >
                    Serviços:
                </Typography>

                {
                    services.length === 0 ? (
                        <Typography
                            tag={"p"}
                        >
                            Não existem serviçõs criados!
                        </Typography>
                    ) : (
                        services.map((service) => (
                            <div key={service.id}>
                                <Card 
                                    project={service}
                                />
                            </div>
                        ))
                    )
                }
            </section>
        </div>
    )
}

export default EditProject;