import { Link } from "react-router-dom";
// import router;

import logo from "../../assets/costs_logo.png";
// import assets;

import { MdMenu, MdClose, MdHome, MdAssignment, MdContacts, MdBusiness} from "react-icons/md";
// import icons;

import styleNavbar from "./Navbar.module.css";
import { useState } from "react";

function Navbar() {
    const [menuAtivo, setMenuAtivo] = useState(false);

    function toogleMenu() {
        setMenuAtivo(!menuAtivo)
    }

    return(
        <nav className={styleNavbar.Nav}>

            <div className={styleNavbar.conteiner_menu}>

                {
                    menuAtivo ? (
                        <MdClose 
                            className={styleNavbar.fechar_menu}        onClick={toogleMenu}
                            data-testid="botao-fechar"
                        />
                    ) : (
                        <MdMenu 
                            className={styleNavbar.abrir_menu} 
                            onClick={toogleMenu}
                            data-testid="botao-abrir"
                        />
                    )
                }

            <ul className={`${styleNavbar.lista_itens_menu} ${menuAtivo ? styleNavbar.menu_ativo : ""}`}>
                <li><Link to={"/"} className={styleNavbar.itens_menu}>{<MdHome className={styleNavbar.icone_menu}/>} Home</Link></li>
                <li><Link to={"/projetos"} className={styleNavbar.itens_menu}>{<MdAssignment className={styleNavbar.icone_menu}/>} Projetos</Link></li>
                <li><Link to={"/contato"} className={styleNavbar.itens_menu}>{<MdContacts className={styleNavbar.icone_menu}/>} Contato</Link></li>
                <li><Link to={"/empresa"} className={styleNavbar.itens_menu}>{<MdBusiness className={styleNavbar.icone_menu}/>} Empresa</Link></li>
            </ul>

            </div>

            <img src={logo} alt="logo_costs" className={styleNavbar.logo}/>

        </nav>
    )
}

export default Navbar;