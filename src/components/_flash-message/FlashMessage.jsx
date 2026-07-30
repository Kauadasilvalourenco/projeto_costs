import { useMessage } from "../../context/MessageContext";
// import context;

import styleFlashMessage from "./FlashMessage.module.css";
// import css;

function FlashMessage() {
    const {message, typeMessage, closeMessage} = useMessage();

    if (message === null) {
        return null;
    };

    return (
        <div
            className={`${styleFlashMessage[typeMessage]} ${styleFlashMessage.conteiner_message}`}
        >
            <p>{message}</p>
            
            <button
                onClick={closeMessage}
                className={styleFlashMessage.btn_close}
            >
                &times;
            </button>
        </div>
    )
}

export default FlashMessage;