import { createContext, useContext } from "react";
// import react;

export const MessageContext = createContext();

export function useMessage() {
    const context = useContext(MessageContext);

    if (!context) {
        throw new Error("useMessage só pode ser usado em um MessageProvider");;
    };

    return context;
};