import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { MessageProvider } from "../../context/MessageProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import EditProject from "./EditProject";
import {
  getProject,
  getCategories,
  getServices,
  editProject,
  createService,
  editStatusService,
} from "../../services/api";

// Mock dos serviços de API
vi.mock("../../services/api");

// Mock do console.error para verificar tratamento de erros
const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

describe("Página de Edição de Projeto - Teste de Integração", () => {
  let queryClient;

  // Instância do userEvent configurada sem delay entre digitações de teclas
  const user = userEvent.setup({ delay: null });

  const mockProject = {
    id: "1",
    nome_projeto: "Projeto Teste",
    categoria_projeto: "Desenvolvimento",
    orcamento_projeto: 5000,
  };

  const mockCategories = [
    { id: "1", name: "Desenvolvimento" },
    { id: "2", name: "Design" },
  ];

  const mockServices = [
    {
      id: "1",
      nome_servico: "Serviço 1",
      custo_servico: 2000,
      status: "Pendente",
      projectID: "1",
    },
    {
      id: "2",
      nome_servico: "Serviço 2",
      custo_servico: 1000,
      status: "Pendente",
      projectID: "1",
    },
  ];

  // Helper de renderização reutilizável
  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/editar-projeto/1"]}>
          <MessageProvider>
            <Routes>
              <Route path="/editar-projeto/:id" element={<EditProject />} />
            </Routes>
          </MessageProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    vi.clearAllMocks();

    getProject.mockResolvedValue(mockProject);
    getCategories.mockResolvedValue(mockCategories);
    getServices.mockResolvedValue(mockServices);
    editProject.mockResolvedValue(undefined);
    createService.mockResolvedValue(undefined);
    editStatusService.mockResolvedValue(undefined);
  });

  it("deve renderizar corretamente e exibir os dados iniciais do projeto", async () => {
    renderComponent();

    // Espera até que o projeto apareça na tela (eliminando necessidade de waitFor explícito)
    expect(
      await screen.findByText((content, element) => element.textContent === "Projeto: Projeto Teste")
    ).toBeInTheDocument();

    expect(getProject).toHaveBeenCalledWith("1");
    expect(getCategories).toHaveBeenCalled();
    expect(getServices).toHaveBeenCalledWith("1");

    expect(screen.getByText((content, element) => element.textContent === "Categoria: Desenvolvimento")).toBeInTheDocument();
    expect(screen.getByText((content, element) => element.textContent === "Orçamento: R$5000,00")).toBeInTheDocument();
    expect(screen.getByText((content, element) => element.textContent === "Total Utilizado: R$3000,00")).toBeInTheDocument();

    expect(screen.getByText("Serviço 1")).toBeInTheDocument();
    expect(screen.getByText("Serviço 2")).toBeInTheDocument();
  });

  it("deve preservar corretamente o estado de totalServiceCost após renderização", async () => {
    renderComponent();

    expect(await screen.findByText(/3000,00/)).toBeInTheDocument();
  });

  it('deve alternar para o formulário de edição ao clicar no botão "Editar"', async () => {
    renderComponent();

    expect(await screen.findByText("Projeto Teste")).toBeInTheDocument();

    const editButton = screen.getByRole("button", { name: /Editar/i });
    await user.click(editButton);

    expect(screen.getByLabelText("Nome do Projeto:")).toBeInTheDocument();
    expect(screen.getByLabelText("Orçamento do Projeto:")).toBeInTheDocument();
    expect(screen.getByLabelText("Selecione uma Categoria")).toBeInTheDocument();
  });

  it('deve alternar para o formulário de criação de serviço ao clicar no botão "Adicionar"', async () => {
    renderComponent();

    const addButton = await screen.findByRole("button", { name: /Adicionar/i });
    await user.click(addButton);

    expect(screen.getByLabelText("Nome do Serviço:")).toBeInTheDocument();
    expect(screen.getByLabelText("Custo do Serviço:")).toBeInTheDocument();
  });

  it("deve renderizar os ícones nos botões", async () => {
    renderComponent();

    const editButton = await screen.findByRole("button", { name: /Editar/i });
    const addButton = screen.getByRole("button", { name: /Adicionar/i });

    expect(editButton.querySelector("svg")).toBeInTheDocument();
    expect(addButton.querySelector("svg")).toBeInTheDocument();
  });

  describe("handleEditProject", () => {
    it("deve chamar editProject com sucesso quando o novo orçamento for maior que o custo total", async () => {
      renderComponent();

      const editButton = await screen.findByRole("button", { name: /Editar/i });
      await user.click(editButton);

      const budgetInput = screen.getByLabelText("Orçamento do Projeto:");
      await user.clear(budgetInput);
      await user.type(budgetInput, "6000");

      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(editProject).toHaveBeenCalledWith("1", {
          nome_projeto: "Projeto Teste",
          categoria_projeto: "Desenvolvimento",
          orcamento_projeto: 6000,
        });
      });
    });

    it("não deve chamar editProject quando o novo orçamento for menor que o custo total", async () => {
      renderComponent();

      const editButton = await screen.findByRole("button", { name: /Editar/i });
      await user.click(editButton);

      const budgetInput = screen.getByLabelText("Orçamento do Projeto:");
      await user.clear(budgetInput);
      await user.type(budgetInput, "2000");

      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      expect(editProject).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Erro: O novo valor de orçamento é menor que o valor total utilizado pelos serviços",
        "error"
      );
    });

    it("deve tratar erro de API ao editar projeto", async () => {
      const mockError = new Error("Erro na API: 500");
      editProject.mockRejectedValue(mockError);

      renderComponent();

      const editButton = await screen.findByRole("button", { name: /Editar/i });
      await user.click(editButton);

      const budgetInput = screen.getByLabelText("Orçamento do Projeto:");
      await user.type(budgetInput, "6000");

      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Erro ao editar o projeto:",
          mockError
        );
      });
    });
  });

  describe("handleCreateService", () => {
    it("deve criar serviço com sucesso quando o custo for válido", async () => {
      const mockNewService = {
        id: "3",
        nome_servico: "Novo Serviço",
        custo_servico: 1500,
        status: "Pendente",
        projectID: "1",
      };

      createService.mockResolvedValue(mockNewService);

      renderComponent();

      const addButton = await screen.findByRole("button", { name: /Adicionar/i });
      await user.click(addButton);

      getServices.mockResolvedValueOnce([...mockServices, mockNewService]);

      const nameInput = screen.getByLabelText("Nome do Serviço:");
      const costInput = screen.getByLabelText("Custo do Serviço:");
      await user.type(nameInput, "Novo Serviço");
      await user.type(costInput, "1500");

      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(createService).toHaveBeenCalledWith("1", {
          nome_servico: "Novo Serviço",
          custo_servico: 1500,
        });
      });

      expect(await screen.findByText("Novo Serviço")).toBeInTheDocument();
      expect(await screen.findByText(/4500,00/)).toBeInTheDocument();
    });

    it("não deve criar serviço quando o custo for inválido", async () => {
      renderComponent();

      const addButton = await screen.findByRole("button", { name: /Adicionar/i });
      await user.click(addButton);

      const nameInput = screen.getByLabelText("Nome do Serviço:");
      const costInput = screen.getByLabelText("Custo do Serviço:");
      await user.type(nameInput, "Serviço Inválido");
      await user.type(costInput, "6000");

      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      expect(createService).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "O custo do serviço ou o custo total dos serviços não pode ser maior que o orçamento do projeto!"
      );
    });

    it("deve tratar erro de API ao criar serviço", async () => {
      const mockError = new Error("Erro na API: 500");
      createService.mockRejectedValue(mockError);

      renderComponent();

      const addButton = await screen.findByRole("button", { name: /Adicionar/i });
      await user.click(addButton);

      const nameInput = screen.getByLabelText("Nome do Serviço:");
      const costInput = screen.getByLabelText("Custo do Serviço:");
      await user.type(nameInput, "Novo Serviço");
      await user.type(costInput, "1500");

      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Erro ao criar o serviço:",
          mockError
        );
      });
    });
  });

  describe("finishService", () => {
    it("deve concluir serviço com sucesso", async () => {
      const mockUpdatedService = {
        id: "1",
        nome_servico: "Serviço 1",
        custo_servico: 2000,
        status: "Concluído",
        projectID: "1",
      };

      const mockUpdatedService2 = {
        id: "2",
        nome_servico: "Serviço 2",
        custo_servico: 1000,
        status: "Concluído",
        projectID: "1",
      };

      editStatusService
        .mockResolvedValueOnce(mockUpdatedService)
        .mockResolvedValueOnce(mockUpdatedService2);

      renderComponent();

      await screen.findByText("Serviço 1");

      getServices.mockResolvedValueOnce([mockUpdatedService, mockServices[1]]);

      const finishButtons = screen.getAllByRole("button", { name: /Concluir Serviço/i });
      await user.click(finishButtons[0]);

      await waitFor(() => {
        expect(editStatusService).toHaveBeenCalledWith("1", expect.anything());
      });

      getServices.mockResolvedValueOnce([mockUpdatedService, mockUpdatedService2]);

      const remainingFinishButton = await screen.findByRole("button", { name: /Concluir Serviço/i });
      await user.click(remainingFinishButton);

      await waitFor(() => {
        expect(editStatusService).toHaveBeenCalledWith("2", expect.anything());
      });

      await waitFor(() => {
        const statusBadges = screen.getAllByText(/Status:\s*Concluído/i);
        expect(statusBadges).toHaveLength(2);
      });

      expect(
        screen.queryByRole("button", { name: /Concluir Serviço/i })
      ).not.toBeInTheDocument();
    });

    it("deve tratar erro de API ao concluir serviço", async () => {
      const mockError = new Error("Erro na API: 500");
      editStatusService.mockRejectedValue(mockError);

      renderComponent();

      await screen.findByText("Serviço 1");

      const finishButtons = screen.getAllByRole("button", { name: /Concluir Serviço/i });
      await user.click(finishButtons[0]);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Erro ao editar o status do serviço:",
          mockError
        );
      });
    });
  });
});