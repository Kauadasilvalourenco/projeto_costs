import { Link } from "react-router-dom";
// import router;

import logo from "../../assets/costs_logo.png";
// import assets;

function Navbar() {
    return(
        <nav className="Nav">
            <div className="menu">
                <ul className="lista_itens_menu">
                    <li><Link to={"/"} className="itens_menu">Home</Link></li>
                    <li><Link to={"/projetos"} className="itens_menu">Projetos</Link></li>
                    <li><Link to={"/contato"} className="itens_menu">Contato</Link></li>
                    <li><Link to={"/empresa"} className="itens_menu">Empresa</Link></li>
                </ul>
            </div>
            <div className="conteiner_logo">
                <img src={logo} alt="logo_costs" className="logo"/>
            </div>
        </nav>
    )
}

export default Navbar;