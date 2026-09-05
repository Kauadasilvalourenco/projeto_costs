import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import hooks;

import { useNavigate } from "react-router-dom";
// import router;

import { useMessage } from "../../context/MessageContext";
// import context;

import Typography from "../../components/_typography/Typography";
import Form from "../../components/_form/Form";
// import components;

import { projectForm, validationProjectForm } from "../../components/_schemas/schema";
// import schemas;

import { getCategories, createProject, getErrorAPI } from "../../services/api";
// import api;

import styleCriarProjeto from "./CreateProject.module.css";
// import css;

function CriarProjeto() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showMessage } = useMessage();

    const {
        data: categories = [],
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
        error: errorCategories
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        retry: 3,
        retryDelay: 1500,
        staleTime: 300000
    });

    const { showMessage } = useMessage();

    useEffect(() => {
        if (isErrorCategories === true) {
            const messageError = getErrorAPI(errorCategories);

            showMessage(`Erro ao acessar as categorias: ${messageError}. Tente novamente mais tarde!`, "error");
            console.error(`Erro ao acessar as categorias:`, errorCategories);
        };
    }, [isErrorCategories, errorCategories, showMessage]);

    const {
        mutate: createProjectMutation,
        isPending: isLoadingCreateProject,
    } = useMutation({
        mutationKey: ["projects"],
        mutationFn: createProject,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"]
            })

            navigate("/projetos");
            showMessage("Projeto criado com sucesso!", "success");
            console.log("Projeto criado com sucesso!");
        },

        onError: (error) => {
            const messageError = getErrorAPI(error)

            showMessage(`Erro ao criar projeto: ${messageError}. Tente novamente mais tarde!`, "error");
            console.error(`Erro ao criar projeto:`, error);
        }
    });

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
                fieldsConfig={projectForm()}
                btnText={"Criar Projeto"}
                schemaZod={validationProjectForm()}
                onSubmit={createProjectMutation}
                onCategories={categories}
                isLoadingCategories={isLoadingCategories}
                isLoadingSugmit={isLoadingCreateProject}
            />

        </div>
    )
}

export default CriarProjeto;