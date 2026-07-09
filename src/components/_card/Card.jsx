import { useNavigate, useLocation } from "react-router-dom";
// import router;

import Button from "../_button/Button";
import Typography from "../_typography/Typography";
// import components;

import styleCard from "./Card.module.css";
// import css;

import { MdEdit, MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
// import icons;


function Card({project, onDeleteProject, service, finishService}) {
    const navigate = useNavigate();
    const location = useLocation();

    const pageProject = location.pathname === "/projetos";

    return(
        <div className={styleCard.Card}>

            {
                pageProject === true ? (
                    <Typography
                        tag={"h2"}
                        style={styleCard.titulo}
                    >
                        {project.nome_projeto}
                    </Typography>
                ) : (
                    <Typography
                        tag={"h2"}
                        style={styleCard.titulo}
                    >
                        {service.nome_servico}
                    </Typography>
                )
            }

            {
                pageProject === true ? (
                    <Typography
                        tag={"p"}
                        style={styleCard.orcamento_projeto}
                    >
                        Orçamento: R${Number(project.orcamento_projeto).toFixed(2).replace(".", ",")}
                    </Typography>
                ) : (
                    <Typography
                        tag={"p"}
                        style={styleCard.custo_servico}
                    >
                        Custo: R${Number(service.custo_servico).toFixed(2).replace(".", ",")}
                    </Typography>
                )
            }

            {
                pageProject === true ? (
                    <Typography
                        tag={"p"}
                        style={styleCard.categoria_projeto}
                    >
                        Categoria: {project.categoria_projeto}
                    </Typography>
                ) : (
                    <Typography>
                        Status: {service.status}
                    </Typography>
                )
            }

            {
                pageProject === true ? (
                    <div className={styleCard.conteiner_button}>

                        <Button
                            style={styleCard.button}
                            onClick={() => navigate(`/editar-projeto/${project.id}`)}
                        >
                            <MdEdit className={styleCard.button_icons}/>
                            Editar
                        </Button>

                        <Button
                            style={styleCard.button}
                            onClick={() => onDeleteProject(project.id)}
                        >
                            <MdDelete className={styleCard.button_icons}/>
                            Deletar
                        </Button>

                    </div>
                ) : service.status === "Pendente" ? (
                    <div className={styleCard.conteiner_button}>
                        <Button
                            onClick={() => finishService(service.id)}
                            style={styleCard.button}
                        >
                            <FaCheck className={styleCard.button_icons}/>
                            Concluir Serviço
                        </Button>
                    </div>
                ) : (
                    ""
                )
            }

        </div>
    )
}

export default Card;