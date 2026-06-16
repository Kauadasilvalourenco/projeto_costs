import { useNavigate } from "react-router-dom";
// import router;

import Button from "../../components/_button/Button";
import Typography from "../../components/_typography/Typography";
// import components;

import imagem_fundo_pq from "../../assets/imagem_fundo_pq.png";
import imagem_fundo_md from "../../assets/imagem_fundo_md.png";
import imagem_fundo from "../../assets/imagem_fundo.png";
// import assets;

import styleHome from "./Home.module.css";
import styleTypography from "../../components/_typography/Typography.module.css";
// import css;

function Home() {
    const navigate = useNavigate();

    function criarProjeto() {
        navigate("/criarProjeto")
    }

    return(
        <div className={styleHome.Home}>

            <Typography 
                tag={"h1"}
            >
                Bem-vindo ao <span className={styleTypography.span}>Costs</span>
            </Typography>
            
            <Typography 
                tag={"p"}

            >
                Comece a gerenciar os seus projetos agora mesmo!
            </Typography>

            <Button
                onClick={criarProjeto}
            >
                Criar Projeto
            </Button>

            <picture>
                <source media="(max-width: 500px)" srcset={imagem_fundo_pq} />
                <source media="(max-width: 1100px)" srcset={imagem_fundo_md} />
                <img src={imagem_fundo} alt="imagem_fundo_costs" />
            </picture>

        </div>
    )
}

export default Home;