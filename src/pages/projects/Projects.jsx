import { useState, useEffect } from "react";
// import hooks;

import { getProjects } from "../../services/api";
// import js;

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
        <div>
            {
                projects.length === 0 ? (
                    <p>Você não tem projetos criados!</p>
                ): (
                    projects.map((project) => (
                        <div>
                            {project.nome_projeto}
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Projects;