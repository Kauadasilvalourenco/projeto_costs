import Typography from "../_typography/Typography";

function Card({project}) {
    return(
        <div>
            <Typography
                tag={"h2"}
            >
                {project.nome_projeto}
            </Typography>
            <Typography
                tag={"p"}
            >
                {project.orcamento_projeto}
            </Typography>
            <Typography
                tag={"p"}
            >
                {project.categoria_projeto}
            </Typography>
        </div>
    )
}

export default Card;