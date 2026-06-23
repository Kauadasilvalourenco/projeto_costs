import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCategories } from "./api";

describe("getCategories()", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });
    
    it("deve realizar a requisição get e trazer os dados de sucesso", async() => {
        const mockData = [
            {id: 1, name: "Infra"},
            {id: 2, name: "Design"}
        ];

        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async() => mockData 
        });
        vi.stubGlobal("fetch", fetchMock);

        const result = await getCategories();

        expect(result).toEqual(mockData);
        expect(fetchMock).toHaveBeenCalledWith("http://localhost:5000/categories", {
            headers: {
                "Content-Type": "application/json"
            }
        });
    });

    it("deve falhar a requisição get e retornar erro 404", async() => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: false,
            status: 404
        });
        vi.stubGlobal("fetch", fetchMock);

        expect(getCategories()).rejects.toThrow("Erro na API: 404");
        expect(fetchMock).toHaveBeenCalledWit("http:localhost:5000/categories", {
            headers: {
                "Content-Type": "application/json"
            }
        });
    });
});