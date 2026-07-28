import { useContext } from "react";
// import react;

import MessageContext from "./MessageContext";
// import context;

export function useMessage() {
    const context = useContext(MessageContext);

    if (!context) {
        throw new Error("useMessage só pode ser usado em um MessageProvider");;
    };

    return context;
};