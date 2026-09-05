import { test, expect } from '@playwright/test';
import { projects } from "../../src/mocks/fixtures/projects";

test('deve excluir projeto com sucesso', async ({ page }) => {
    let remaingProjects = [...projects];

    await page.route("https://projeto-costs-back-end-n9bu.onrender.com**/projects**", async(route) => {
        const method = route.request().method();

        if (method === "DELETE") {
            remaingProjects = remaingProjects.filter((project) => project.id !== 1);

            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ message: "Projeto deletado com sucesso" })
            });
        };

        if (method === "GET") {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(remaingProjects)
            });
        };
    });

    await page.goto('http://localhost:5173/projetos');

    const projectCard = page.getByTestId('project-card').filter({ hasText: "TesteProjeto01" });

    await expect(projectCard).toBeVisible();

    const deleteButton = projectCard.getByRole('button', { name: 'Deletar' });

    await expect(deleteButton).toBeVisible();

    await deleteButton.click();

    await expect(projectCard).not.toBeVisible();
});