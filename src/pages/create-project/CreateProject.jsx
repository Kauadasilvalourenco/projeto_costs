import { useState, useEffect } from "react";
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
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const { showMessage } = useMessage();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                const messageError = getErrorAPI(error);

                showMessage(`Erro ao acessar as categorias: ${messageError}. Tente novamente mais tarde!`, "error");
                console.error(`Erro ao acessar as categorias:`, error);
            }
        };

        fetchData();

    }, [showMessage]);

    async function handleCreateProject(project) {
        try {
            await createProject(project);
            navigate("/projetos");
            showMessage("Projeto criado com sucesso!", "success");
            console.log("Projeto criado com sucesso!");
        } catch (error) {
            const messageError = getErrorAPI(error)

            showMessage(`Erro ao criar projeto: ${messageError}. Tente novamente mais tarde!`, "error");
            console.error(`Erro ao criar projeto:`, error);
        }
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

            <Form 
                fieldsConfig={projectForm()}
                btnText={"Criar Projeto"}
                schemaZod={validationProjectForm()}
                onSubmit={handleCreateProject}
                onCategories={categories}
            />

        </div>
    )
}

export default CriarProjeto;