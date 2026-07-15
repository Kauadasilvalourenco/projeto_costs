import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Card from "./Card";

const mockOnDeleteProject = vi.fn();
const mockFinishService = vi.fn();
const mockNavigate = vi.fn();

describe("Componente Card", () => {
    const mockProject = {
        id: "proj01",
        nome_projeto: "Projeto Teste",
        orcamento_projeto: 5000,
        categoria_projeto: "Desenvolvimento",
    };

    const mockService = {
        id: "serv01",
        nome_servico: "Serviço Teste",
        custo_servico: 1000,
        status: "Pendente",
    };

    vi.mock("react-router-dom", async () => {
        const actual = await vi.importActual("react-router-dom");
        return {
            ...actual,
            useNavigate: () => mockNavigate,
        };
    });

    const renderCard = (route = "/projetos") => {
        return render(
            <MemoryRouter initialEntries={[route]}>
            <Card
                project={mockProject}
                onDeleteProject={mockOnDeleteProject}
                service={mockService}
                finishService={mockFinishService}
            />
            </MemoryRouter>,
        );
    };

    it("deve renderizar o card como Projeto na rota '/projetos'", () => {
        renderCard("/projetos");

        // Verifica renderização dos dados do projeto
        expect(screen.getByText("Projeto Teste")).toBeInTheDocument();
        expect(screen.getByText("Orçamento: R$5000,00")).toBeInTheDocument();
        expect(screen.getByText("Categoria: Desenvolvimento")).toBeInTheDocument();

        // Verifica presença dos botões de Projeto
        expect(screen.getByText("Editar")).toBeInTheDocument();
        expect(screen.getByText("Deletar")).toBeInTheDocument();
        expect(screen.queryByText("Concluir Serviço")).not.toBeInTheDocument();
    });

    it("deve renderizar o card como Serviço em outras rotas", () => {
        renderCard("/outra-rota");

        // Verifica renderização dos dados do serviço
        expect(screen.getByText("Serviço Teste")).toBeInTheDocument();
        expect(screen.getByText("Custo: R$1000,00")).toBeInTheDocument();
        expect(screen.getByText("Status: Pendente")).toBeInTheDocument();

        // Verifica presença do botão de Serviço
        expect(screen.getByText("Concluir Serviço")).toBeInTheDocument();
        expect(screen.queryByText("Editar")).not.toBeInTheDocument();
        expect(screen.queryByText("Deletar")).not.toBeInTheDocument();
    });

    it("deve chamar o navigate para a rota correta ao clicar em 'Editar'", async () => {
        const user = userEvent.setup();
        mockNavigate.mockClear(); // Limpa chamadas anteriores

        renderCard("/projetos");

        const editButton = screen.getByText("Editar");
        await user.click(editButton);

        // Garante que o hook foi chamado com a rota dinâmica correta baseada no ID
        expect(mockNavigate).toHaveBeenCalledWith("/editar-projeto/proj01");
    });

    it("deve chamar onDeleteProject com o ID correto ao clicar em 'Deletar'", async () => {
        const user = userEvent.setup();
        renderCard("/projetos");

        const deleteButton = screen.getByText("Deletar");
        await user.click(deleteButton);

        expect(mockOnDeleteProject).toHaveBeenCalledWith("proj01");
    });

        it("deve chamar finishService com o ID correto ao clicar em 'Concluir Serviço'", async () => {
        const user = userEvent.setup();
        renderCard("/outra-rota");

        const finishButton = screen.getByText("Concluir Serviço");
        await user.click(finishButton);

        expect(mockFinishService).toHaveBeenCalledWith("serv01");
    });
});
