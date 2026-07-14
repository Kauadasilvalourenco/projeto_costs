import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateProject from './CreateProject';
import { createProject } from '../../services/api';
import { getCategories } from '../../services/api';

// Mock do serviço de API
vi.mock('../../services/api');

// Mock do hook useNavigate do react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Página Criar Projeto - Teste de Integração', () => {
  beforeEach(() => {
    // Resetar mocks antes de cada teste
    vi.clearAllMocks();
    
    // Mock inicial para createProject
    createProject.mockResolvedValue({ id: 1, nome_projeto: 'Projeto Teste' });
    getCategories.mockResolvedValue([
      { id: 1, name: 'Desenvolvimento' }
    ]);
  });

  it('deve integrar corretamente todos os componentes da página', () => {
    render(<CreateProject />);

    // Verificar se o título principal é renderizado
    expect(screen.getByRole('heading', { level: 1, name: /criar projeto/i })).toBeInTheDocument();

    // Verificar se o parágrafo de instrução é renderizado
    expect(screen.getByText(/crie seu projeto para depois adicionar os serviços!/i)).toBeInTheDocument();

    // Verificar se os campos do formulário estão presentes (integração com Form, Input, Select)
    expect(screen.getByLabelText(/nome do projeto:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/orçamento do projeto:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/selecione uma categoria:/i)).toBeInTheDocument();

    // Verificar se o botão de submissão está presente
    expect(screen.getByRole('button', { name: /criar projeto/i })).toBeInTheDocument();
  });

  it('deve chamar createProject e navegar após submissão válida', async () => {
    const user = userEvent.setup();
    render(<CreateProject />);

    // Preencher o formulário com dados válidos
    await user.type(screen.getByLabelText(/nome do projeto:/i), 'Projeto Teste');
    await user.type(screen.getByLabelText(/orçamento do projeto:/i), '5000');
    
    // Simular seleção de categoria
    const selectElement = screen.getByLabelText(/selecione uma categoria:/i);
    await user.selectOptions(selectElement, "Desenvolvimento")

    // Clicar no botão de submissão
    const submitButton = screen.getByRole('button', { name: /criar projeto/i });
    await user.click(submitButton);

    // Verificar se a função createProject foi chamada com os dados corretos
    await waitFor(() => {
      expect(createProject).toHaveBeenCalledWith({
        nome_projeto: 'Projeto Teste',
        orcamento_projeto: 5000,
        categoria_projeto: 'Desenvolvimento'
      });
    });

    // Verificar se a navegação foi chamada para a página de projetos
    expect(mockNavigate).toHaveBeenCalledWith('/projetos');
  });
});