import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import hooks;

import { useParams } from "react-router-dom";
// import router;

import { useMessage } from "../../context/MessageContext";
// import context;

import Typography from "../../components/_typography/Typography";
import Button from "../../components/_button/Button";
import Form from "../../components/_form/Form";
import Card from "../../components/_card/Card";
// import components;

import { editProjectForm, validationEditProjectForm, createServiceForm, validationCreateServiceForm } from "../../components/_schemas/schema";
// import schemas;

import { getCategories, getProject, editProject, getServices, createService, editStatusService, getErrorAPI } from "../../services/api";
// import api;

import styleEditProject from "./EditProject.module.css";
import styleTypography from "../../components/_typography/Typography.module.css";
// import css;

import imgLoading from "../../assets/loading.svg";
// import img;

import { MdEdit } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
// import icons;

function EditProject() {
    const queryClient = useQueryClient();

    const { id } = useParams();

    const { showMessage } = useMessage();

    const [projectVisible, setProjectVisible] = useState(true);
    const [serviceVisible, setServiceVisible] = useState(false);

    const {
        data: categories = [],
        isError: isErrorCategories,
        error: errorCategories
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        retry: 3,
        retryDelay: 1500,
        staleTime: 300000
    });
    // query categories;

    const {
        data: project = [],
        isLoading: isLoadingProject,
        isError: isErrorProject,
        error: errorProject
    } = useQuery({
        queryKey: ["projects", id],
        queryFn: () => getProject(id),
        retry: 3,
        retryDelay: 1500,
        staleTime: 300000
    });
    // query project;

    const {
        data: services = [],
        isLoading: isLoadingServices,
        isError: isErrorServices,
        error: errorServices
    } = useQuery({
        queryKey: ["services", id],
        queryFn: () => getServices(id),
        retry: 3,
        retryDelay: 1500,
        staleTime: 300000
    });
    // query services;

    const totalServiceCost = services.reduce((acc, service) => {
        return acc + Number(service.custo_servico || 0);
    }, 0);

    useEffect(() => {
        if (isErrorCategories === true) {
            const messageError = getErrorAPI(errorCategories);

            showMessage(`Erro ao acessar as categorias: ${messageError}. Tente novamente mais tarde!`, "error");
            console.error(`Erro ao acessar as categorias:`, errorCategories);
        }
    }, [errorCategories, isErrorCategories, showMessage]);
    // trata erro da query categories;

    useEffect(() => {
        if (isErrorProject === true) {
            const messageError = getErrorAPI(errorProject);

            showMessage(`Erro ao acessar o projeto: ${messageError}. Tente novamente mais tarde!`, "error");
            console.error(`Erro ao acessar o projeto:`, errorProject);
        }
    }, [errorProject, isErrorProject, showMessage]);
    // trata erro da query project;

    useEffect(() => {
        if (isErrorServices === true) {
            const messageError = getErrorAPI(errorServices);

            showMessage(`Erro ao acessar os serviços: ${messageError}. Tente novamente mais tarde!`, "error");
            console.error(`Erro ao acessar os serviços:`, errorServices);
        };

    }, [errorServices, isErrorServices, showMessage]);
    // trata erro da query services;

    const {
        mutate: editProjectMutation,
        isPending: isLoadingEditProject,
        error: errorEditProject
    } = useMutation({
        mutationKey: ["editProject", id],
        mutationFn: (updateProject) => editProject(id, updateProject),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects", id]
            });

            setProjectVisible(!projectVisible);
            showMessage("Projeto editado com sucesso!", "success");
            console.log("Projeto editado com sucesso!");
        },

        onError: () => {
            const messageError = getErrorAPI(errorEditProject);

            showMessage(`Erro ao editar o projeto: ${messageError}. Tente novamente mais tarde!`, "error");
            console.error(`Erro ao editar o projeto:`, errorEditProject);
        }
    });

    const {
        mutate: createServiceMutation,
        isPending: isLoadingCreateService,
        error: errorCreateService
    } = useMutation({
        mutationKey: ["services"],
        mutationFn: (data) => createService(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["services", id]
            });

            setServiceVisible(!serviceVisible);
            showMessage("Serviço criado com sucesso!", "success");
            console.log("Serviço criado com sucesso!");
        },

        onError: () => {
            const messageError = getErrorAPI(errorCreateService);

            showMessage(`Erro ao criar o serviço: ${messageError}. Tente novamente mais tarde!`, "error");
            console.error(`Erro ao criar o serviço:`, errorCreateService);
        }
    });

    const {
        mutate: editStatusServiceMutation,
        isPending: isLoadingStatusService,
        error: errorStatusService
    } = useMutation({
        mutationKey: ["statusService"],
        mutationFn: editStatusService,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["services", id]
            })

            showMessage("Serviço concluído com sucesso!", "success");
            console.log("Serviço concluído com sucesso!");
        },

        onError: () => {
            const messageError = getErrorAPI(errorStatusService);

            showMessage(`Erro ao concluir o serviço: ${messageError}. Tente novamente mais tarde!`, "error");
            console.error(`Erro ao editar o status do serviço:`, errorStatusService);
        }
    });

    function handleEditProject(updateProject) {
        if (totalServiceCost <= updateProject.orcamento_projeto) {
            editProjectMutation(updateProject);
        } else {
            showMessage("Erro: O novo valor de orçamento é menor que o valor total utilizado pelos serviços", "error");
            console.error("Erro: O novo valor de orçamento é menor que o valor total utilizado pelos serviços", "error");
        }
    };

    function handleCreateService(data) {
        if (totalServiceCost + data.custo_servico <= project.orcamento_projeto && data.custo_servico <= project.orcamento_projeto) {
            createServiceMutation(data);
            
        } else {
            showMessage("O custo do serviço ou o custo total dos serviços não pode ser maior que o orçamento do projeto!", "error");
            console.error("O custo do serviço ou o custo total dos serviços não pode ser maior que o orçamento do projeto!");
        }
    };

    function finishService(serviceID) {
        editStatusServiceMutation(serviceID);
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

    return(
        <div className={styleEditProject.page_edit_project}>

            {
                isLoadingProject === true ? (
                    <img 
                        src={imgLoading} 
                        alt="imagem_loading" 
                        className={styleEditProject.img_loading}
                    />
                ) : (
                    projectVisible === true ? (
                        <section
                            className={styleEditProject.section_project}
                        >
                            <Typography
                                tag={"h2"}
                            >
                                Projeto: <span className={styleTypography.span_destaque}>{project.nome_projeto}</span>
                            </Typography>
                            <Typography
                                tag={"h2"}
                            >
                                Categoria: <span className={styleTypography.span_destaque}>{project.categoria_projeto}</span>
                            </Typography>
                            <Typography
                                tag={"h2"}
                            >
                                Orçamento: <span className={styleTypography.span_destaque}>R${Number(project.orcamento_projeto).toFixed(2).replace(".", ",")}</span>
                            </Typography>
                            <Typography
                                tag={"h2"}
                            >
                                Total Utilizado: <span className={styleTypography.span_destaque}>R${Number(totalServiceCost).toFixed(2).replace(".", ",")}</span>
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
                            fieldsConfig={editProjectForm()}
                            schemaZod={validationEditProjectForm()}
                            formData={project}
                            btnText={"Salvar"}
                            onSubmit={handleEditProject}
                            isLoadingSubmit={isLoadingEditProject}
                        />
                    )
                )
            }

            <hr />

            {
                serviceVisible === false ? (
                    <section className={styleEditProject.section_add_service}>
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
                    </section>
                ) : (
                    <Form
                        fieldsConfig={createServiceForm()}
                        schemaZod={validationCreateServiceForm()}
                        btnText={"Salvar"}
                        onSubmit={handleCreateService}
                        isLoadingSubmit={isLoadingCreateService}
                    />
                )
            }

            <hr />

            {
                isLoadingServices === true ? (
                    <img 
                        src={imgLoading} 
                        alt="imagem_loading" 
                        className={styleEditProject.img_loading}
                    />
                ) : (
                    services.length === 0 ? (
                        <Typography
                            tag={"p"}
                        >
                            Não existem serviços criados!
                        </Typography>
                    ) : (
                        services.map((service) => (
                            <div
                                key={service.id}
                                className={styleEditProject.conteiner_card}
                            >
                                <Card
                                    service={service}
                                    finishService={finishService}
                                    isLoadingStatusService={isLoadingStatusService}
                                />
                            </div>
                        ))
                    )
                )
            }

        </div>
    )
}

export default EditProject;