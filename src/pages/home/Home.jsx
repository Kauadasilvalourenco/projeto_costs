import Button from "../../components/_button/Button";
import Typography from "../../components/_typography/Typography";
// import components;

import styleTypography from "../../components/_typography/Typography.module.css";
// import css;

function Home() {
    return(
        <div>

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

            <Button>
                Criar Projeto
            </Button>

        </div>
    )
}

export default Home;