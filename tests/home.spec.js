import { test, expect } from '@playwright/test';

test.describe('Fluxo da Página Home', () => {
  
  test('Deve carregar a home e navegar para a tela de criação de projetos ao clicar no botão', async ({ page }) => {
    // Abre a página inicial
    await page.goto('/');

    // ✅ MELHOR PRÁTICA: Procura diretamente pelo cabeçalho h1
    await expect(page.locator('h1')).toContainText('Bem-vindo ao Costs');
    
    // ✅ CORREÇÃO: Usa getByText para mirar diretamente no conteúdo do parágrafo, ignorando a tag genérica
    await expect(page.getByText('Comece a gerenciar os seus projetos agora mesmo!')).toBeVisible();

    // Encontra o botão e clica nele
    const botaoCriar = page.getByRole('button', { name: 'Criar Projeto' });
    await expect(botaoCriar).toBeVisible();
    await botaoCriar.click();

    // Valida se a URL mudou para /criarProjeto
    await expect(page).toHaveURL(/\/criarProjeto/);

    // ✅ CORREÇÃO: Evita locator('div') genérico que também pode falhar por strict mode futuros
    await expect(page.getByText('Página Criação Projetos')).toBeVisible();
  });
});