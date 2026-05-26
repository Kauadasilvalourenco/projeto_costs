import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Typography from './Typography';

describe('Componente Typography', () => {
  it('deve renderizar uma tag h1 quando passado via prop', () => {
    render(<Typography tag="h1">Título Principal</Typography>);
    
    const titulo = screen.getByRole('heading', { level: 1 });
    expect(titulo).toBeInTheDocument();
    expect(titulo.tagName).toBe('H1');
  });

  it('deve renderizar um parágrafo como padrão se nenhuma tag válida for passada', () => {
    render(<Typography>Texto Padrão</Typography>);
    
    const paragrafo = screen.getByText('Texto Padrão');
    expect(paragrafo.tagName).toBe('P');
  });
});