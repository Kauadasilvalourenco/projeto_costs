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
  let queryClient

  const user = userEvent.setup();

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

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    });

    // Resetar mocks antes de cada teste
    vi.clearAllMocks();

    // Mock inicial vazio para evitar chamadas reais
    getProject.mockResolvedValue(mockProject);
    getCategories.mockResolvedValue(mockCategories);
    getServices.mockResolvedValue(mockServices);
    editProject.mockResolvedValue(undefined);
    createService.mockResolvedValue(undefined);
    editStatusService.mockResolvedValue(undefined);
  });

  it("deve renderizar corretamente e exibir os dados iniciais do projeto", async () => {
    render(
      <QueryClientProvider
        client={queryClient}
      >
        <MemoryRouter initialEntries={["/editar-projeto/1"]}>
          <MessageProvider>
            <Routes>
              <Route path="/editar-projeto/:id" element={<EditProject />} />
            </Routes>
          </MessageProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Verificar se as funções de API foram chamadas
    await waitFor(() => {
      expect(getProject).toHaveBeenCalledWith("1");
      expect(getCategories).toHaveBeenCalled();
      expect(getServices).toHaveBeenCalledWith("1");
    });

    // Verificar se os dados do projeto são exibidos
    expect(
      await screen.findByText((content, element) => {
        return element.textContent === "Projeto: Projeto Teste";
      }),
    ).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element.textContent === "Categoria: Desenvolvimento";
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element.textContent === "Orçamento: R$5000,00";
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element.textContent === "Total Utilizado: R$3000,00";
    })).toBeInTheDocument();

    // Verificar se os serviços são exibidos
    expect(screen.getByText("Serviço 1")).toBeInTheDocument();
    expect(screen.getByText("Serviço 2")).toBeInTheDocument();
  });

  it("deve preservar corretamente o estado de totalServiceCost após renderização", async () => {
    // Certifique-se de importar Routes e Route no topo do arquivo se necessário:
    // import { MemoryRouter, Routes, Route } from 'react-router-dom';

    render(
      <QueryClientProvider
        client={queryClient}
      >
        <MemoryRouter initialEntries={["/editar-projeto/1"]}>
          <MessageProvider>
            <Routes>
              <Route path="/editar-projeto/:id" element={<EditProject />} />
            </Routes>
          </MessageProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Verificar se o total de serviços é calculado corretamente
    expect(await screen.findByText(/3000,00/)).toBeInTheDocument();
  });

  it('deve alternar para o formulário de edição ao clicar no botão "Editar"', async () => {
    // Certifique-se de importar Routes e Route no topo do arquivo se necessário:
    // import { MemoryRouter, Routes, Route } from 'react-router-dom';

    render(
      <QueryClientProvider
        client={queryClient}
      >
        <MemoryRouter initialEntries={["/editar-projeto/1"]}>
          <MessageProvider>
            <Routes>
              <Route path="/editar-projeto/:id" element={<EditProject />} />
            </Routes>
          </MessageProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Verificar se os dados do projeto estão visíveis inicialmente
    expect(await screen.findByText("Projeto Teste")).toBeInTheDocument();

    // Clicar no botão de editar
    const editButton = screen.getByRole("button", { name: /Editar/i });
    await user.click(editButton);

    // Verificar se o formulário de edição está visível
    expect(screen.getByLabelText("Nome do Projeto:")).toBeInTheDocument();
    expect(screen.getByLabelText("Orçamento do Projeto:")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Selecione uma Categoria"),
    ).toBeInTheDocument();
  });

  it('deve alternar para o formulário de criação de serviço ao clicar no botão "Adicionar"', async () => {
    // Certifique-se de importar Routes e Route no topo do arquivo se necessário:
    // import { MemoryRouter, Routes, Route } from 'react-router-dom';

    render(
      <QueryClientProvider
        client={queryClient}
      >
        <MemoryRouter initialEntries={["/editar-projeto/1"]}>
          <MessageProvider>
            <Routes>
              <Route path="/editar-projeto/:id" element={<EditProject />} />
            </Routes>
          </MessageProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Clicar no botão de adicionar serviço
    const addButton = await screen.findByRole("button", { name: /Adicionar/i });
    await user.click(addButton);

    // Verificar se o formulário de criação de serviço está visível
    expect(screen.getByLabelText("Nome do Serviço:")).toBeInTheDocument();
    expect(screen.getByLabelText("Custo do Serviço:")).toBeInTheDocument();
  });

  it("deve renderizar os ícones nos botões", async () => {
    // Certifique-se de importar Routes e Route no topo do arquivo se necessário:
    // import { MemoryRouter, Routes, Route } from 'react-router-dom';

    render(
      <QueryClientProvider
        client={queryClient}
      >
        <MemoryRouter initialEntries={["/editar-projeto/1"]}>
          <MessageProvider>
            <Routes>
              <Route path="/editar-projeto/:id" element={<EditProject />} />
            </Routes>
          </MessageProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Verificar se os ícones estão presentes nos botões
    const editButton = await screen.findByRole("button", { name: /Editar/i });
    const addButton = screen.getByRole("button", { name: /Adicionar/i });

    expect(editButton.querySelector("svg")).toBeInTheDocument();
    expect(addButton.querySelector("svg")).toBeInTheDocument();
  });

  describe("handleEditProject", () => {
    it("deve chamar editProject com sucesso quando o novo orçamento for maior que o custo total", async () => {
      render(
        <QueryClientProvider
          client={queryClient}
        >
          <MemoryRouter initialEntries={["/editar-projeto/1"]}>
            <MessageProvider>
              <Routes>
                <Route path="/editar-projeto/:id" element={<EditProject />} />
              </Routes>
            </MessageProvider>
          </MemoryRouter>
        </QueryClientProvider>
      );

      // Alterna para o formulário de edição
      const editButton = await screen.findByRole("button", { name: /Editar/i });
      await user.click(editButton);

      // Preenche o formulário com novo orçamento maior que o custo total
      const budgetInput = screen.getByLabelText("Orçamento do Projeto:");
      await user.clear(budgetInput); // Limpa o "5000" do input antes de digitar
      await user.type(budgetInput, "6000");

      // Submete o formulário
      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      // Verifica se editProject foi chamado
      await waitFor(() => {
        expect(editProject).toHaveBeenCalledWith("1", {
          nome_projeto: "Projeto Teste",
          categoria_projeto: "Desenvolvimento",
          orcamento_projeto: 6000,
        });
      });
    });

    it("não deve chamar editProject quando o novo orçamento for menor que o custo total", async () => {
      render(
        <QueryClientProvider
          client={queryClient}
        >
          <MemoryRouter initialEntries={["/editar-projeto/1"]}>
            <MessageProvider>
              <Routes>
                <Route path="/editar-projeto/:id" element={<EditProject />} />
              </Routes>
            </MessageProvider>
          </MemoryRouter>
        </QueryClientProvider>
      );

      // Alterna para o formulário de edição
      const editButton = await screen.findByRole("button", { name: /Editar/i });
      await user.click(editButton);

      // Preenche o formulário com novo orçamento menor que o custo total
      const budgetInput = screen.getByLabelText("Orçamento do Projeto:");
      await user.clear(budgetInput); // Limpa o "5000" do input antes de digitar
      await user.type(budgetInput, "2000");

      // Submete o formulário
      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      // Verifica se editProject não foi chamado
      expect(editProject).not.toHaveBeenCalled();

      // Verifica se o erro de negócio foi registrado
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Erro: O novo valor de orçamento é menor que o valor total utilizado pelos serviços", "error"
      );
    });

    it("deve tratar erro de API ao editar projeto", async () => {
      const mockError = new Error("Erro na API: 500");
      editProject.mockRejectedValue(mockError);

      render(
        <QueryClientProvider
          client={queryClient}
        >
          <MemoryRouter initialEntries={["/editar-projeto/1"]}>
            <MessageProvider>
              <Routes>
                <Route path="/editar-projeto/:id" element={<EditProject />} />
              </Routes>
            </MessageProvider>
          </MemoryRouter>
        </QueryClientProvider>
      );

      // Alterna para o formulário de edição
      const editButton = await screen.findByRole("button", { name: /Editar/i });
      await user.click(editButton);

      // Preenche o formulário
      const budgetInput = screen.getByLabelText("Orçamento do Projeto:");
      await user.type(budgetInput, "6000");

      // Submete o formulário
      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      // Verifica se o erro de API foi tratado
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Erro ao editar o projeto:" ,mockError,
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

      render(
        <QueryClientProvider
          client={queryClient}
        >
          <MemoryRouter initialEntries={["/editar-projeto/1"]}>
            <MessageProvider>
              <Routes>
                <Route path="/editar-projeto/:id" element={<EditProject />} />
              </Routes>
            </MessageProvider>
          </MemoryRouter>
        </QueryClientProvider>
      );

      // Alterna para o formulário de criação de serviço
      const addButton = await screen.findByRole("button", {
        name: /Adicionar/i,
      });
      await user.click(addButton);

      getServices.mockResolvedValueOnce([...mockServices, mockNewService]);

      // Preenche o formulário
      const nameInput = screen.getByLabelText("Nome do Serviço:");
      const costInput = screen.getByLabelText("Custo do Serviço:");
      await user.type(nameInput, "Novo Serviço");
      await user.type(costInput, "1500");

      // Submete o formulário
      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      // Verifica se createService foi chamado
      await waitFor(() => {
        expect(createService).toHaveBeenCalledWith("1", {
          nome_servico: "Novo Serviço",
          custo_servico: 1500,
        });
      });

      // Verifica se o novo serviço aparece na lista
      expect(await screen.findByText("Novo Serviço")).toBeInTheDocument();

      // Verifica se o total utilizado foi atualizado
      // Busca diretamente pelo valor dentro do span de destaque
      expect(await screen.findByText(/4500,00/)).toBeInTheDocument();
    });

    it("não deve criar serviço quando o custo for inválido", async () => {
      render(
        <QueryClientProvider
          client={queryClient}
        >
          <MemoryRouter initialEntries={["/editar-projeto/1"]}>
            <MessageProvider>
              <Routes>
                <Route path="/editar-projeto/:id" element={<EditProject />} />
              </Routes>
            </MessageProvider>
          </MemoryRouter>
        </QueryClientProvider>
      );

      // Alterna para o formulário de criação de serviço
      const addButton = await screen.findByRole("button", {
        name: /Adicionar/i,
      });
      await user.click(addButton);

      // Preenche o formulário com custo que ultrapassa o orçamento
      const nameInput = screen.getByLabelText("Nome do Serviço:");
      const costInput = screen.getByLabelText("Custo do Serviço:");
      await user.type(nameInput, "Serviço Inválido");
      await user.type(costInput, "6000");

      // Submete o formulário
      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      // Verifica se createService não foi chamado
      expect(createService).not.toHaveBeenCalled();

      // Verifica se o erro de negócio foi registrado
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "O custo do serviço ou o custo total dos serviços não pode ser maior que o orçamento do projeto!"
      );
    });

    it("deve tratar erro de API ao criar serviço", async () => {
      const mockError = new Error("Erro na API: 500");
      createService.mockRejectedValue(mockError);

      // Certifique-se de importar Routes e Route no topo do arquivo se necessário:
      // import { MemoryRouter, Routes, Route } from 'react-router-dom';

      render(
        <QueryClientProvider
          client={queryClient}
        >
          <MemoryRouter initialEntries={["/editar-projeto/1"]}>
            <MessageProvider>
              <Routes>
                <Route path="/editar-projeto/:id" element={<EditProject />} />
              </Routes>
            </MessageProvider>
          </MemoryRouter>
        </QueryClientProvider>
      );

      // Alterna para o formulário de criação de serviço
      const addButton = await screen.findByRole("button", {
        name: /Adicionar/i,
      });
      await user.click(addButton);

      // Preenche o formulário
      const nameInput = screen.getByLabelText("Nome do Serviço:");
      const costInput = screen.getByLabelText("Custo do Serviço:");
      await user.type(nameInput, "Novo Serviço");
      await user.type(costInput, "1500");

      // Submete o formulário
      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      await user.click(saveButton);

      // Verifica se o erro de API foi tratado
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Erro ao criar o serviço:", mockError
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

      render(
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

      // Aguarda renderização inicial dos serviços
      await screen.findByText("Serviço 1");

      // Mock para a busca de serviços após a primeira conclusão
      getServices.mockResolvedValueOnce([
        mockUpdatedService,
        mockServices[1],
      ]);

      // 1. Clica no primeiro botão de concluir
      const finishButtons = screen.getAllByRole("button", {
        name: /Concluir Serviço/i,
      });
      await user.click(finishButtons[0]);

      // Aguarda a chamada da API do primeiro serviço
      await waitFor(() => {
        expect(editStatusService).toHaveBeenCalledWith("1", expect.anything());
      });

      // Mock para a busca de serviços após a segunda conclusão
      getServices.mockResolvedValueOnce([
        mockUpdatedService,
        mockUpdatedService2,
      ]);

      // 2. Busca novamente o botão restante no DOM atualizado e clica nele
      const remainingFinishButton = await screen.findByRole("button", {
        name: /Concluir Serviço/i,
      });
      await user.click(remainingFinishButton);

      // Aguarda a chamada da API do segundo serviço
      await waitFor(() => {
        expect(editStatusService).toHaveBeenCalledWith("2", expect.anything());
      });

      // 3. Verifica se os status foram atualizados para Concluído
      await waitFor(() => {
        const statusBadges = screen.getAllByText(/Status:\s*Concluído/i);
        expect(statusBadges).toHaveLength(2);
      });

      // 4. Verifica se nenhum botão de concluir serviço sobrou no DOM
      expect(
        screen.queryByRole("button", { name: /Concluir Serviço/i })
      ).not.toBeInTheDocument();
    });

    it("deve tratar erro de API ao concluir serviço", async () => {
      const mockError = new Error("Erro na API: 500");
      editStatusService.mockRejectedValue(mockError);

      render(
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

      // Aguarda renderização dos serviços
      await screen.findByText("Serviço 1");

      // Clica no botão de concluir serviço
      const finishButtons = screen.getAllByRole("button", {
        name: /Concluir Serviço/i,
      });
      await user.click(finishButtons[0]);

      // Verifica se o erro de API foi tratado
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Erro ao editar o status do serviço:",
          mockError
        );
      });
    });
  });
});