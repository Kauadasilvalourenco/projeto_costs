import { test, expect } from '@playwright/test';
import { projects } from "../../src/mocks/fixtures/projects";

test('deve editar projeto com sucesso', async ({ page }) => {
    let editedProject = projects.find((project) => project.id === 1);

    await page.route("https://projeto-costs-back-end-n9bu.onrender.com**/projects**", async(route) => {
        const url = route.request().url();
        const method = route.request().method();

        if (method === "GET" && url == "https://projeto-costs-back-end-n9bu.onrender.com/projects") {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(projects)
            });
        } else if (method === "GET" && url === `https://projeto-costs-back-end-n9bu.onrender.com/projects/${editedProject.id}`) {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(editedProject)
            });
        };

        if (method === "PUT") {
            editedProject.nome_projeto = "TesteProject01";

            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(editedProject)
            });
        };
    });

    await page.goto("http://localhost:5173/projetos");

    await expect(page.getByTestId('project-card').filter({ hasText: "TesteProjeto01" })).toBeVisible();

    const editButton = page
        .getByTestId('project-card')
        .filter({ hasText: 'TesteProjeto01' })
        .getByRole('button', { name: 'Editar' });

    await expect(editButton).toBeVisible();
    await editButton.click();

    await expect(page.getByRole('heading', { name: 'Projeto: TesteProjeto01' })).toBeVisible();

    await expect(page.getByRole('button', { name: 'Editar' })).toBeVisible();

    await page.getByRole('button', { name: 'Editar' }).click();

    await expect(page.getByRole('textbox', { name: 'Nome do Projeto:' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Nome do Projeto:' }).fill('TesteProjet01');

    await expect(page.getByRole('button', { name: 'Salvar' })).toBeVisible();

    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByRole('heading', { name: 'Projeto: TesteProjeto01' })).not.toBeVisible();
});