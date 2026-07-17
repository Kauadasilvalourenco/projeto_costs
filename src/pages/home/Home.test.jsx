import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

// Criamos um mock para monitorar o redirecionamento sem quebrar o teste
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const atual = await vi.importActual('react-router-dom');
  return {
    ...atual,
    useNavigate: () => mockNavigate,
  };
});

describe('Página Home (Vitest)', () => {
  it('deve renderizar as mensagens de boas-vindas e a imagem', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/Bem-vindo ao/i)).toBeInTheDocument();
    expect(screen.getByText(/Costs/i)).toBeInTheDocument();
    expect(screen.getByText(/Comece a gerenciar os seus projetos agora mesmo!/i)).toBeInTheDocument();
    expect(screen.getByAltText('imagem_fundo_costs')).toBeInTheDocument();
  });

  it('deve chamar a navegação para /criar-projeto ao clicar no botão', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const botao = screen.getByRole('button', { name: /criar projeto/i });
    fireEvent.click(botao);

    // Garante que a função de navegação foi chamada com a rota certa
    expect(mockNavigate).toHaveBeenCalledWith('/criar-projeto');
  });
});