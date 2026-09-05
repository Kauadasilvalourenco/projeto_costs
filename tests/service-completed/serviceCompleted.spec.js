import { test, expect } from '@playwright/test';
import { services } from "../../src/mocks/fixtures/services"

test('deve editar o status do serviço com sucesso', async ({ page }) => {
    const servicesOfProject = services.filter((service) => service.projectID === 1);
    let editedService = services[0];

    await page.route("https://projeto-costs-back-end-n9bu.onrender.com**/services**", async(route) => {
        const method = route.request().method();

        if (method === "GET") {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(servicesOfProject)
            });
        };

        if (method === "PATCH") {
            editedService.status = "Concluído";

            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(editedService)
            });
        };
    });

    await page.goto('http://localhost:5173/editar-projeto/1');

    const serviceCard = page.getByTestId('project-card').filter({ hasText: "TesteServiço01" })

    await expect(serviceCard).toBeVisible();

    await expect(serviceCard.getByText('Status: Pendente')).toBeVisible();

    await expect(serviceCard.getByRole('button', { name: 'Concluir Serviço' })).toBeVisible();

    await serviceCard.getByRole('button', { name: 'Concluir Serviço' }).click();

    await expect(serviceCard.getByText('Status: Concluído')).toBeVisible();

});