import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
// import icons;

import styleFooter from "./Footer.module.css";

function Footer() {
    return(
        <footer className={styleFooter.Footer}>

            <div className={styleFooter.conteiner_icones}>
                <a href="http://wa.me/5562998446350" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className={styleFooter.icones}/>
                </a>
                <a href="https://www.linkedin.com/in/kauã-da-silva-lourenço-1b7a58345?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn className={styleFooter.icones}/>
                </a>
            </div>

            <p><span className={styleFooter.destaque}>Costs</span></p>

        </footer>
    )
}

export default Footer;