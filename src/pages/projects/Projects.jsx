import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

import imgLoading from "../../assets/loading.svg";
// import img;

function Projects() {
    const queryClient = useQueryClient();
    const { showMessage } = useMessage();

    const {
        data: projects = [],
        isLoading: isLoadingProjects,
        isError: isErrorProjects,
        error: errorProjects
    } = useQuery({
        queryKey: ["projects"],
        queryFn: getProjects,
        retry: 3,
        retryDelay: 1500,
        staleTime: 300000
    });

    const {
        mutate: deleteProjectMutation,
        isPending: isLoadingDeleteProject,
        error: errorDeleteProject
    } = useMutation({
        mutationKey: ["projects"],
        mutationFn: async(id) => {
            const servicesProject = await getServices(id);

            if (servicesProject.length > 0) {
                for (const service of servicesProject) {
                    await deleteService(service.id);
                };
            };

            await deleteProject(id);
        },
        retry: 3,
        retryDelay: 1500,

        onSuccess: (id) => {
            queryClient.removeQueries({
                queryKey: ["services", id]
            })

            queryClient.invalidateQueries({
                queryKey: ["projects"]
            });

            showMessage("Projeto deletado com sucesso!", "success");
            console.log("Projeto deletado com sucesso!");
        }, 

        onError: () => {
            const messageError = getErrorAPI(errorDeleteProject);

            showMessage(`Erro ao deletar projeto: ${messageError} Tente novamente mais tarde!`, "error");
            console.error(`Erro ao deletar projeto:`, errorDeleteProject);
        }
    });

    useEffect(() => {
        if (isErrorProjects === true) {
            const messageError = getErrorAPI(errorProjects);

            showMessage(`Não foi possível acessar os projetos: ${messageError}. Tente novamente mais tarde!`, "error");
            console.error("Não foi possível acessar os projetos", errorProjects);
        }
    }, [isErrorProjects, errorProjects, showMessage]);

    return(
        <div className={styleProjects.page_projects}>

            {

                projects.length === 0 ? (
                    isLoadingProjects === true ? (
                        <img 
                            src={imgLoading} 
                            alt="imagem_loading"
                            className={styleProjects.img_loading} 
                        />
                    ) : (
                        <Typography
                            tag={"p"}
                        >
                            Não existem projetos criados!
                        </Typography>
                    )
                ): (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            className={styleProjects.conteiner_cards}
                        >
                            <Card 
                                project={project}
                                onDeleteProject={deleteProjectMutation}
                                isLoadingDeleteProjects={isLoadingDeleteProject}
                            />
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Projects;