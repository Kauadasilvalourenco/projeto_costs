import { Link } from "react-router-dom";
// import router;

import logo from "../../assets/costs_logo.png";
// import assets;

import { MdMenu, MdClose } from "react-icons/md";
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
                        <MdClose className={styleNavbar.fechar_menu} onClick={toogleMenu}/>
                    ) : (
                        <MdMenu className={styleNavbar.abrir_menu} onClick={toogleMenu}/>
                    )
                }

            <ul className={`${styleNavbar.lista_itens_menu} ${menuAtivo ? styleNavbar.menu_ativo : ""}`}>
                <li><Link to={"/"} className={styleNavbar.itens_menu}>Home</Link></li>
                <li><Link to={"/projetos"} className={styleNavbar.itens_menu}>Projetos</Link></li>
                <li><Link to={"/contato"} className={styleNavbar.itens_menu}>Contato</Link></li>
                <li><Link to={"/empresa"} className={styleNavbar.itens_menu}>Empresa</Link></li>
            </ul>

            </div>

            <img src={logo} alt="logo_costs" className={styleNavbar.logo}/>

        </nav>
    )
}

export default Navbar;