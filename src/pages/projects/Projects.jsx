import { useState, useEffect } from "react";
// import hooks;

import { useMessage } from "../../context/MessageContext";
// import context;

import { getProjects, getServices, deleteProject, deleteService, getErrorAPI } from "../../services/api";
// import api;

import Card from "../../components/_card/Card";
import Typography from "../../components/_typography/Typography";
// import components;

import styleProjects from "./Projects.module.css";
// import css;

function Projects() {
    const [projects, setProjects] = useState([]);

    const { showMessage } = useMessage();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getProjects();
                setProjects(data)
            } catch (error) {
                const messageError = getErrorAPI(error);

                showMessage(`Não foi possível acessar os projetos: ${messageError}. Tente novamente mais tarde!`, "error");
                console.error("Não foi possível acessar os projetos", error);
            }
        };

        fetchData();

    }, [showMessage]);

    async function handleDeleteProject(id) {
        try {
            const servicesProject = await getServices(id);

            if (servicesProject.length > 0) {
                for (const service of servicesProject) {
                    await deleteService(service.id);
                };
            };

            await deleteProject(id);
            setProjects(projects.filter((project) => project.id !== id));
            showMessage("Projeto deletado com sucesso!", "success");
            console.log("Projeto deletado com sucesso!");
        } catch (error) {
            const messageError = getErrorAPI(error);

            showMessage(`Erro ao deletar projeto: ${messageError} Tente novamente mais tarde!`, "error");
            console.error(`Erro ao deletar projeto:`, error);
        }
    }

    return(
        <div className={styleProjects.page_projects}>
            {
                projects.length === 0 ? (
                    <Typography
                        tag={"p"}
                    >
                        Não existem projetos criados!
                    </Typography>
                ): (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            className={styleProjects.conteiner_cards}
                        >
                            <Card 
                                project={project}
                                onDeleteProject={handleDeleteProject}
                            />
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Projects;