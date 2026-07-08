import { useNavigate } from "react-router-dom";
// import router;

import Button from "../_button/Button";
import Typography from "../_typography/Typography";
// import components;

import styleCard from "./Card.module.css";
// import css;

import { MdEdit, MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
// import icons;


function Card({project, onDeleteProject}) {
    const navigate = useNavigate();

    return(
        <div className={styleCard.Card}>

            {
                project.nome_projeto !== undefined ? (
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
                        {project.nome_servico}
                    </Typography>
                )
            }

            {
                project.orcamento_projeto !== undefined ? (
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
                        Custo: R${Number(project.custo_servico).toFixed(2).replace(".", ",")}
                    </Typography>
                )
            }

            {
                project.categoria_projeto !== undefined ? (
                    <Typography
                        tag={"p"}
                        style={styleCard.categoria_projeto}
                    >
                        Categoria: {project.categoria_projeto}
                    </Typography>
                ) : (
                    ""
                )
            }

            {
                project.nome_projeto !== undefined ? (
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
                ) : (
                    <div className={styleCard.conteiner_button}>
                        <Button
                            style={styleCard.button}
                        >
                            <FaCheck className={styleCard.button_icons}/>
                            Concluir Serviço
                        </Button>
                    </div>
                )
            }

        </div>
    )
}

export default Card;