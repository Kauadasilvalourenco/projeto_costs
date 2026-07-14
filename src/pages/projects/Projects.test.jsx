import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Projects from "./Projects";
import {
  getProjects,
  getServices,
  deleteProject,
  deleteService,
} from "../../services/api";

// Mock dos serviços de API
vi.mock("../../services/api");

// Mock do console.error para verificar tratamento de erros
const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

describe("Página Projetos - Teste de Integração", () => {
    const user = userEvent.setup();

    beforeEach(() => {
        // Resetar mocks antes de cada teste
        vi.clearAllMocks();

        // Mock inicial vazio para evitar chamadas reais
        getProjects.mockResolvedValue([]);
        getServices.mockResolvedValue([]);
        deleteProject.mockResolvedValue(undefined);
        deleteService.mockResolvedValue(undefined);
    });

    it("deve renderizar corretamente quando não há projetos", async () => {
        render(
            <MemoryRouter initialEntries={["/projetos"]}>
            <Projects />
            </MemoryRouter>,
        );

        // Verificar se a função getProjects foi chamada
        await waitFor(() => {
            expect(getProjects).toHaveBeenCalled();
        });

        // Verificar se a mensagem de ausência de projetos é exibida
        expect(
            screen.getByText("Não existem projetos criados!"),
        ).toBeInTheDocument();
    });

    it("deve renderizar os cards dos projetos quando existem projetos", async () => {
        const mockProjects = [
            {
            id: 1,
            nome_projeto: "Projeto Teste 1",
            orcamento_projeto: 1000,
            categoria_projeto: "Desenvolvimento",
            },
            {
            id: 2,
            nome_projeto: "Projeto Teste 2",
            orcamento_projeto: 2000,
            categoria_projeto: "Design",
            },
        ];

        // Mock da função getProjects para retornar projetos
        getProjects.mockResolvedValue(mockProjects);

        render(
            <MemoryRouter initialEntries={["/projetos"]}>
            <Projects />
            </MemoryRouter>,
        );

        // Aguardar a chamada da API
        await waitFor(() => {
            expect(getProjects).toHaveBeenCalled();
        });

        // Verificar se os cards dos projetos são renderizados
        expect(screen.getByText("Projeto Teste 1")).toBeInTheDocument();
        expect(screen.getByText("Orçamento: R$1000,00")).toBeInTheDocument();
        expect(screen.getByText("Categoria: Desenvolvimento")).toBeInTheDocument();

        expect(screen.getByText("Projeto Teste 2")).toBeInTheDocument();
        expect(screen.getByText("Orçamento: R$2000,00")).toBeInTheDocument();
        expect(screen.getByText("Categoria: Design")).toBeInTheDocument();
    });

    it("deve deletar um projeto com serviços associados com sucesso", async () => {
        const mockProjects = [
            {
            id: 1,
            nome_projeto: "Projeto Teste",
            orcamento_projeto: 1000,
            categoria_projeto: "Desenvolvimento",
            },
        ];

        const mockServices = [
            {
            id: 101,
            projectID: 1,
            nome_servico: "Serviço 1",
            custo_servico: 500,
            status: "Pendente",
            },
            {
            id: 102,
            projectID: 1,
            nome_servico: "Serviço 2",
            custo_servico: 300,
            status: "Pendente",
            },
        ];

        // Mock das funções
        getProjects.mockResolvedValue(mockProjects);
        getServices.mockResolvedValue(mockServices);
        deleteService.mockResolvedValue(undefined);
        deleteProject.mockResolvedValue(undefined);

        render(
            <MemoryRouter initialEntries={["/projetos"]}>
            <Projects />
            </MemoryRouter>,
        );

        // Aguardar carregamento inicial
        await waitFor(() => {
            expect(getProjects).toHaveBeenCalled();
        });

        // Encontrar e clicar no botão de deletar
        const deleteButton = screen.getByRole("button", { name: "Deletar" });
        await user.click(deleteButton);

        // Verificar chamadas às APIs de serviços
        await waitFor(() => {
            expect(getServices).toHaveBeenCalledWith(1);
            expect(deleteService).toHaveBeenCalledTimes(2);
            expect(deleteService).toHaveBeenCalledWith(101);
            expect(deleteService).toHaveBeenCalledWith(102);
        });

        // Verificar chamada à API de projeto
        expect(deleteProject).toHaveBeenCalledWith(1);

        // Verificar que o card do projeto foi removido
        await waitFor(() => {
            expect(screen.queryByText("Projeto Teste")).not.toBeInTheDocument();
        });
    });

    it("deve tratar erro na deleção de projeto e manter o card na tela", async () => {
        const mockProjects = [
            {
            id: 1,
            nome_projeto: "Projeto Teste",
            orcamento_projeto: 1000,
            categoria_projeto: "Desenvolvimento",
            },
        ];

        // Mock das funções
        getProjects.mockResolvedValue(mockProjects);
        getServices.mockResolvedValue([]);
        deleteProject.mockRejectedValue(new Error("Erro na API"));

        render(
            <MemoryRouter initialEntries={["/projetos"]}>
            <Projects />
            </MemoryRouter>,
        );

        // Aguardar carregamento inicial
        await waitFor(() => {
            expect(getProjects).toHaveBeenCalled();
        });

        // Encontrar e clicar no botão de deletar
        const deleteButton = screen.getByRole("button", { name: "Deletar" });
        await user.click(deleteButton);

        // Verificar que o erro foi tratado
        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining("Erro ao deletar projeto"),
            );
        });

        // Verificar que o card permanece na tela
        expect(screen.getByText("Projeto Teste")).toBeInTheDocument();
    });
});
