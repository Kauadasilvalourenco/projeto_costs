import { useState, useEffect } from "react";
// import hooks;

import { getProjects, getServices, deleteProject, deleteService } from "../../services/api";
// import js;

import Card from "../../components/_card/Card";
import Typography from "../../components/_typography/Typography";
// import components;

import styleProjects from "./Projects.module.css";
// import css;

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getProjects();
            setProjects(data)
            console.log(`Projetos acessados com sucesso: ${data}`);
        };

        fetchData();

    }, []);

    async function handleDeleteProject(id) {
        try {
            const servicesProject = await getServices(id);

            if (servicesProject.length > 0) {
                const serviceOfProject = servicesProject.filter((service) => service.projectID === id);

                for (const service of serviceOfProject) {
                    await deleteService(service.id);
                }

                console.log("Serviço deletado com sucesso!");
            };

            await deleteProject(id);
            setProjects(projects.filter((project) => project.id !== id))
            console.log("Projeto deletado com sucesso!");
        } catch (error) {
            console.error(`Erro ao deletar projeto: ${error}`);
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