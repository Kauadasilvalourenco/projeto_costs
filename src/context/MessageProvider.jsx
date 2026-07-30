import { useCallback, useState } from "react";
// import react;

import { MessageContext } from "./MessageContext";

export function MessageProvider({ children }) {
    const [message, setMessage] = useState(null);
    const [typeMessage, setTypeMessage] = useState("");

    const showMessage = useCallback((msg, msgType = "success") => {
        setMessage(msg);
        setTypeMessage(msgType);

        setTimeout(() => {
            setMessage(null);
            setTypeMessage("");
        }, 4000);
    }, []);

    function closeMessage() {
        setMessage(null);
        setTypeMessage("");
    };

    return (
        <MessageContext.Provider
            value={{ message, typeMessage, showMessage, closeMessage }}
        >
            { children }
        </MessageContext.Provider>
    );
};