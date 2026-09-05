import { test, expect } from '@playwright/test';
import { projects } from "../../src/mocks/fixtures/projects";

test('deve criar projeto com sucesso', async ({ page }) => {
  const newProject = {
    id: projects.length + 1,
    nome_projeto: 'TesteProjeto03',
    orcamento_projeto: '5000',
    categoria_projeto: 'Desenvolvimento'
  };

  await page.route("https://projeto-costs-back-end-n9bu.onrender.com/projects", async(route) => {
    const method = route.request().method();

    if (method === "GET") {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([...projects, newProject])
      });
    };
    
    if (method === "POST") {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify(newProject)
      });
    }
  });

  await page.goto('http://localhost:5173/');

  await expect(page.getByRole('heading', { name: 'Bem-vindo ao Costs' })).toBeVisible();

  await expect(page.getByRole('img', { name: 'imagem_fundo_costs' })).toBeVisible();

  await page.getByRole('button', { name: 'Criar Projeto' }).click();

  await expect(page.getByRole('heading', { name: 'Criar Projeto' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Nome do Projeto:' }).fill('TesteProjeto03');

  await page.getByRole('spinbutton', { name: 'Orçamento do Projeto:' }).fill('5000');

  await page.getByRole('button', { name: 'Criar Projeto' }).click();

  await expect(page.getByText('É preciso selecionar uma categoria!')).toBeVisible();

  await page.getByLabel('Selecione uma Categoria:').selectOption('Desenvolvimento');

  await page.getByRole('button', { name: 'Criar Projeto' }).click();

  await expect(page.getByTestId('project-card').filter({ hasText: 'TesteProjeto03' })).toBeVisible();
});
