import Button from "../_button/Button";
import Typography from "../_typography/Typography";
// import components;

import styleCard from "./Card.module.css";
// import css;

function Card({project}) {
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
                <Button>
                    Editar
                </Button>
                <Button>
                    Deletar
                </Button>
            </div>
        </div>
    )
}

export default Card;