import { useState, useEffect } from "react";
// import hooks;

import { useParams } from "react-router-dom";
// import router;

import z from "zod/v3";
// import zod;

import Typography from "../../components/_typography/Typography";
import Button from "../../components/_button/Button";
import Form from "../../components/_form/Form";
import Input from "../../components/_input/Input";
import Select from "../../components/_select/Select";
import Card from "../../components/_card/Card";
// import components;

import { getCategories, getProject, editProject, getServices, createService, editStatusService } from "../../services/api";
// import js;

import styleEditProject from "./EditProject.module.css";
// import css;

import { MdEdit } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
// import icons;

function EditProject() {
    const [project, setProject] = useState(null);
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [totalServiceCost, setTotalServiceCost] = useState(0);

    const { id } = useParams();

    const [projectVisible, setProjectVisible] = useState(true);
    const [serviceVisible, setServiceVisible] = useState(false);

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

                const totalCost = data.reduce((acc, service) => {
                    return acc + Number(service.custo_servico || 0);
                }, 0)
                setTotalServiceCost(totalCost);
            } catch (error) {
                console.error(`Erro ao acessar os serviços: ${error} `);
            }
        };

        fetchData();

    }, [id]);

    async function handleEditProject(updateProject) {
        try {
            await editProject(id, updateProject);
            setProject(updateProject);
            setProjectVisible(!projectVisible);
            console.log("Projeto editado com sucesso!");
        } catch (error) {
            console.error(`Erro ao editar o projeto: ${error}`);
        }
    };

    async function handleCreateService(data) {
        try {
            if (totalServiceCost + data.custo_servico <= project.orcamento_projeto && data.custo_servico <= project.orcamento_projeto) {
                const newService = await createService(id, data);
                setServices((prevService) => [...prevService, newService]);
                setTotalServiceCost((prevServiceCost) => prevServiceCost + data.custo_servico);
                setServiceVisible(!serviceVisible);
                console.log("Serviço criado com sucesso!");
            } else {
                console.error("O custo do serviço ou o custo total dos serviços não pode ser maior ou igual ao orçamento do projeto!");
            }
        } catch (error) {
            console.error(`Erro ao criar o serviço: ${error}`);
        }
    };

    async function finishService(serviceID) {
        try {
            const status = await editStatusService(serviceID);
            setServices((prevServices) => {
                return prevServices.map((service) => service.id === serviceID ? status : service )
            })
            console.log("Serviço editado com sucesso!");
        } catch (error) {
            console.error(`Erro ao editar o status do serviço: ${error}`);
        }
    }

    if (project === null) {
        return "Carregando...";
    };

    function toogleEditForm() {
        setProjectVisible(!projectVisible);
    };

    function toogleServiceForm() {
        setServiceVisible(!serviceVisible);
    };

    const editProjectForm = [
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
                    name: "nome_projeto", type: "text", placeholder: "EX: Criação Landing-Page"
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
                    name: "categoria_projeto"
                }
            }
        }
    ];

    const editFormValidation = z.object({
        nome_projeto: z.string()
        .min(1, "O campo não pode ser nulo!")
        .regex(/^(?!\d+$).+$/, "O nome do projeto não pode ser composto somente por números"),

        orcamento_projeto: z.coerce.number()
        .min(1, "O campo não pode ser nulo!"),

        categoria_projeto: z.string()
        .min(1, "É preciso selecionar uma categoria!")
    });

    const createServiceForm = [
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

    const createServiceValidation = z.object({
        nome_servico: z.string()
        .min(1, "O campo não pode ser nulo!")
        .regex(/^(?!\d+$).+$/, "O nome do serviço não pode ser composto somente por números"),

        custo_servico: z.coerce.number()
        .min(1, "O campo não pode ser nulo!")
    });

    return(
        <div className={styleEditProject.page_edit_project}>

            {
                projectVisible === true ? (
                    <section>

                        <Typography
                            tag={"h2"}
                        >
                            Projeto: {project.nome_projeto}
                        </Typography>

                        <Typography
                            tag={"p"}
                        >
                            Categoria: {project.categoria_projeto}
                        </Typography>

                        <Typography
                            tag={"p"}
                        >
                            Orçamento: R${Number(project.orcamento_projeto).toFixed(2).replace(".", ",")}
                        </Typography>

                        <Typography>
                            Total Utilizado: R${Number(totalServiceCost).toFixed(2).replace(".", ",")}
                        </Typography>

                        <div className={styleEditProject.conteiner_button}>
                            <Button
                                onClick={toogleEditForm}
                                style={styleEditProject.button}
                            >
                                <MdEdit />
                                Editar
                            </Button>
                        </div>

                    </section>
                ) : (
                    <Form
                        onCategories={categories}
                        fieldsConfig={editProjectForm}
                        schemaZod={editFormValidation}
                        formData={project}
                        btnText={"Salvar"}
                        onSubmit={handleEditProject}
                    />
                )
            }

            <hr />

            {
                serviceVisible === false ? (
                    <div className={styleEditProject.conteiner_button}>
                        <Typography
                            tag={"h2"}
                        >
                            Adicionar Serviço:
                        </Typography>
                        <Button
                            onClick={toogleServiceForm}
                            style={styleEditProject.button}
                        >
                            <IoMdAddCircleOutline className={styleEditProject.icons}/>
                            Adicionar
                        </Button>
                    </div>
                ) : (
                    <Form 
                        fieldsConfig={createServiceForm}
                        schemaZod={createServiceValidation}
                        btnText={"Salvar"}
                        onSubmit={handleCreateService}
                    />
                )
            }

            <hr />

            {
                services.length === 0 ? (
                    <Typography
                        tag={"p"}
                    >
                        Não existem serviços criados!
                    </Typography>
                ) : (
                    services.map((service) => (
                        <div key={service.id}>
                            <Card 
                                service={service}
                                finishService={finishService}
                            />
                        </div>
                    ))
                )
            }

        </div>
    )
}

export default EditProject;