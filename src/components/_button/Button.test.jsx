import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Componente Button', () => {
  it('deve renderizar o texto filho (children) corretamente', () => {
    render(<Button>Clique Aqui</Button>);
    
    const botao = screen.getByRole('button', { name: /clique aqui/i });
    expect(botao).toBeInTheDocument();
  });

  it('deve chamar a função onClick quando for clicado', () => {
    const fnMockada = vi.fn();
    render(<Button onClick={fnMockada}>Salvar</Button>);
    
    const botao = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(botao);
    
    expect(fnMockada).toHaveBeenCalledTimes(1);
  });
});