import { useState, useEffect } from "react";
// import hooks;

import { useNavigate } from "react-router-dom";
// import router;

import Typography from "../../components/_typography/Typography";
import Form from "../../components/_form/Form";
// import components;

import { projectForm, validationProjectForm } from "../../components/_schemas/schema";
// import schemas;

import { getCategories, createProject } from "../../services/api";
// import api;

import styleCriarProjeto from "./CreateProject.module.css";
// import css;

function CriarProjeto() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, []);

    async function handleCreateProject(project) {
        try {
            await createProject(project);
            navigate("/projetos")
            console.log("Projeto criado com sucesso!");
            navigate("/projetos")
        } catch (error) {
            console.error(`Erro ao criar projeto: ${error}`);
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