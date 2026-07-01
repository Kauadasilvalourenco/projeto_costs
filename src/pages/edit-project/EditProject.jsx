import { useState, useEffect } from "react";
// import hooks;

import { useParams } from "react-router-dom";
// import router;

import Typography from "../../components/_typography/Typography";
import Button from "../../components/_button/Button";
// import components;

import { getProject } from "../../services/api";
// import js;

import styleEditProject from "./EditProject.module.css";
// import css;

function EditProject() {
    const [project, setProject] = useState(null);
    const [totalUtilizado, setTotalUtilizado] = useState(0);
    const { id } = useParams();

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

    
    if (project === null) {
        return "Carregando..."
    }

    return(
        <div className={styleEditProject.page_edit_project}>
            <section className={styleEditProject.section_edit_project}>
                <Typography
                    tag={"h1"}
                >
                    Projeto: {project.nome_projeto}
                </Typography>
                <Typography
                    tag={"p"}
                >
                    Categoria: {project.categoria_projeto}
                </Typography>
                <Typography>
                    Orçamento: R${project.orcamento_projeto.toFixed(2).replace(".", ",")}
                </Typography>
                <Typography>
                    Total Utilizado: R${totalUtilizado.toFixed(2).replace(".", ",")}
                </Typography>
                <Button>
                    Editar Projeto
                </Button>
            </section>

            <hr />

            <section className={styleEditProject.section_add_service}>
                <Typography
                    tag={"h2"}
                >
                    Adicione um Serviço:
                    <Button>
                        Adiconar Serviço
                    </Button>
                </Typography>
            </section>

            <hr />

            <section className={styleEditProject.section_services}>
                <Typography
                    tag={"h2"}
                >
                    Serviços:
                </Typography>
            </section>
        </div>
    )
}

export default EditProject;