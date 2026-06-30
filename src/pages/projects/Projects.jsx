import { useState, useEffect } from "react";
// import hooks;

import { getProjects } from "../../services/api";
import { deleteProject } from "../../services/api";
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