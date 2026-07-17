import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa6";
// import icons;

import styleFooter from "./Footer.module.css";

function Footer() {
    return(
        <footer className={styleFooter.Footer}>

            <div className={styleFooter.conteiner_icones}>
                <FaInstagram className={styleFooter.icones}/>
                <FaWhatsapp className={styleFooter.icones}/>
                <FaLinkedinIn className={styleFooter.icones}/>
            </div>

            <p><span className={styleFooter.destaque}>Costs</span> &copy; 2026</p>

        </footer>
    )
}

export default Footer;