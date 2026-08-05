import { useEffect } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MessageProvider } from "./MessageProvider";
import { useMessage } from "./MessageContext";

describe("showMessage", () => {
    function TestComponent() {
        const { showMessage, message } = useMessage();

        useEffect(() => {
            showMessage("Sucesso", "success")
        }, [showMessage]);

        return(
            <>
                <span>{message}</span>
            </>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers()
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("deve executar showMessage, verificar se o estado foi alterado e se após 4 segundos é redefinido", async() => {
        render(
            <MessageProvider>
                <TestComponent />
            </MessageProvider>
        );

        expect(screen.getByText("Sucesso")).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(4000);
        });

        expect(screen.queryByText("Sucesso")).not.toBeInTheDocument();
    });
});