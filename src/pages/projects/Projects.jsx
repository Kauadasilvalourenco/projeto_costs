import { useState, useEffect } from "react";
// import hooks;

import { getProjects } from "../../services/api";
// import js;

import Card from "../../components/_card/Card";
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

    return(
        <div className={styleProjects.page_projects}>
            {
                projects.length === 0 ? (
                    <p>Você não tem projetos criados!</p>
                ): (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            className={styleProjects.conteiner_cards}
                        >
                            <Card 
                                project={project}
                            />
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Projects;