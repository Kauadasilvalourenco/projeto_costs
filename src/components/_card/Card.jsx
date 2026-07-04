import { useNavigate } from "react-router-dom";
// import router;

import Button from "../_button/Button";
import Typography from "../_typography/Typography";
// import components;

import styleCard from "./Card.module.css";
// import css;

import { MdEdit, MdDelete } from "react-icons/md";


function Card({project, onDeleteProject,}) {
    const navigate = useNavigate();

    return(
        <div className={styleCard.Card}>

            <Typography
                tag={"h2"}
                style={styleCard.titulo}
            >
                {project.nome_projeto || project.nome_servico}
            </Typography>

            {
                project.orcamento_projeto !== undefined ? (
                    <Typography
                        tag={"p"}
                        style={styleCard.orcamento}
                    >
                        Orçamento: R${project.orcamento_projeto},00
                    </Typography>
                ) : (
                    <Typography
                        tag={"p"}
                        style={styleCard.orcamento}
                    >
                        Custo: R${project.custo_servico},00
                    </Typography>
                )
            }

            {
                project.categoria_projeto !== undefined ? (
                    <Typography
                        tag={"p"}
                        style={styleCard.categoria}
                    >
                        Categoria: {project.categoria_projeto}
                    </Typography>
                ) : (
                    ""
                )
            }

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
        </div>
    )
}

export default Card;