import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa6";
// import icons;

function Footer() {
    return(
        <footer>

            <div className="conteiner_icones">
                <FaInstagram className="icones"/>
                <FaWhatsapp className="icones"/>
                <FaLinkedinIn className="icones"/>
            </div>

            <p><span>Costs</span> &copy; 2021</p>

        </footer>
    )
}

export default Footer;