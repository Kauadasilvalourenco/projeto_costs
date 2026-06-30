import Button from "../_button/Button";
import Typography from "../_typography/Typography";
// import components;

import styleCard from "./Card.module.css";
// import css;

import { MdEdit, MdDelete } from "react-icons/md";


function Card({project, onDeleteProject}) {
    return(
        <div className={styleCard.Card}>

            <Typography
                tag={"h2"}
                style={styleCard.titulo}
            >
                {project.nome_projeto}
            </Typography>

            <Typography
                tag={"p"}
                style={styleCard.orcamento}
            >
                Orçamento: R${project.orcamento_projeto},00
            </Typography>

            <Typography
                tag={"p"}
                style={styleCard.categoria}
            >
                Categoria: {project.categoria_projeto}
            </Typography>

            <div className={styleCard.conteiner_button}>

                <Button
                    style={styleCard.button}
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