import { test, expect} from '@playwright/test';
import { services } from "../../src/mocks/fixtures/services";
import { projects } from "../../src/mocks/fixtures/projects";

test('deve criar serviço com sucesso', async ({ page }) => {
    const newService = {
        projectID: 1,
        status: "Pendente",
        nome_servico: "TesteServiço04",
        custo_servico: 1000,
        id: services.length + 1
    };

    let currentServices = services.filter((service) => service.projectID === 1);

    await page.route("https://projeto-costs-back-end-n9bu.onrender.com**/projects**", async(route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(projects[0])
        })
    })

    await page.route("https://projeto-costs-back-end-n9bu.onrender.com**/services**", async(route) => {
        const method = route.request().method();

        if (method === "POST") {
            currentServices.push(newService);

            await route.fulfill({
                status: 201,
                contentType: "application/json",
                body: JSON.stringify(newService)
            });
        };

        if (method === "GET") {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(currentServices)
            });
        };
    });

    await page.goto('http://localhost:5173/editar-projeto/1');

    await expect(page.getByRole('heading', { name: 'Adicionar Serviço:' })).toBeVisible();

    await expect(page.getByRole('button', { name: 'Adicionar' })).toBeVisible();

    await page.getByRole('button', { name: 'Adicionar' }).click();

    await expect(page.getByRole('textbox', { name: 'Nome do Serviço:' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Nome do Serviço:' }).fill('TesteServiço04');

    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText('O campo não pode ser nulo!')).toBeVisible();

    await page.getByRole('spinbutton', { name: 'Custo do Serviço:' }).fill('1000');

    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByTestId('project-card').filter({ hasText: "TesteServiço04" })).toBeVisible();
});