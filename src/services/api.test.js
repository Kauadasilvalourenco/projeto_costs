import { describe, it, expect } from "vitest";
import {
    getCategories, getProjects, getProject, getServices, getErrorAPI,
    createProject, createService,
    editProject, editStatusService,
    deleteProject, deleteService,
} from "./api";
import { database } from "../mocks/mockDatabase";

describe("getCategories", () => {
    it("deve retornar as categorias com sucesso", async() => {
        const result = await getCategories();

        expect(result.data).toEqual(database.categories);
        expect(result.status).toEqual(200);
    });

    it("deve retornar um erro para categorias não encontradas (404)", async() => {
        database.categories = [];

        try {
            await getCategories();
        } catch (error) {
            const messageError = getErrorAPI(error);
            
            expect(messageError).toEqual("Recurso não encontrado no servidor!");
            expect(error.status).toEqual(404);
        }
    });
});

describe("getProjects", () => {
    it("deve retornar os projetos com sucesso", async() => {
        const result = await getProjects();

        expect(result.data).toEqual(database.projects);
        expect(result.status).toEqual(200)
    });

    it("deve retornar um erro para projetos não encontrados (404)", async() => {
        database.projects = [];

        try {
            await getProjects();
        } catch (error) {
            const messageError = getErrorAPI(error);
            
            expect(messageError).toEqual("Recurso não encontrado no servidor!");
            expect(error.status).toEqual(404);
        }
    });
});

describe("getProject", () => {
    it("deve retornar o projeto específicado com sucesso", async() => {
        const projectID = database.projects[0].id;

        const result = await getProject(projectID);

        expect(result.data).toEqual(database.projects[0]);
        expect(result.status).toEqual(200);
    });

    it("deve retornar um erro para projeto não encontrado", async() => {
        const projectID = 999999;

        try {
            await getProject(projectID);
        } catch (error) {
            const messageError = getErrorAPI(error);
            
            expect(messageError).toEqual("Recurso não encontrado no servidor!");
            expect(error.status).toEqual(404);
        }
    });
});

describe("getServices", () => {
    it("deve retornar os serviços correspondentes ao projeto específicado com sucesso", async() => {
        const projectID = database.projects[0].id;

        const result = await getServices(projectID);

        expect(result.data).toEqual(database.services.filter((services) => services.projectID === projectID));
        expect(result.status).toEqual(200);
    });

    it("deve retornar um erro para serviços não encontrados", async() => {
        const projectID = 999999

        try {
            await getServices(projectID);
        } catch (error) {
            const messageError = getErrorAPI(error);
            
            expect(messageError).toEqual("Recurso não encontrado no servidor!");
            expect(error.status).toEqual(404);
        }
    });
});

describe("createProject", () => {
    it("deve retornar o novo projeto criado com sucesso", async() => {
        const oldLength = database.projects.length;
        
        const newProject = {
            nome_projeto: "NovoProjeto01",
            orcamento_projeto: 2000,
            categoria_projeto: "Desenvolvimento",
            id: 3
        };

        const result = await createProject(newProject);

        expect(database.projects.length).toEqual(oldLength + 1);
        expect(database.projects[2].nome_projeto).toEqual(newProject.nome_projeto);
        expect(result.data).toEqual(newProject);
        expect(result.status).toEqual(201);
    });

    it("deve retornar um erro para projeto não criado", async() => {
        const newProject = {}

        try {
            await createProject(newProject);
        } catch (error) {
            const messageError = getErrorAPI(error);
            
            expect(messageError).toEqual("Dados imcompletos!");
            expect(error.status).toEqual(400);
        }
    });
});

describe("createService", () => {
    it("deve retornar o novo serviço criado para o projeto específicado com sucesso", async() => {
        const projectID = database.projects[0].id;

        const oldLength = database.services.length;

        const newService = {
            projectID: 1,
            status: "Pendente",
            nome_servico: "NovoServiço01",
            custo_servico: 500,
            id: 4
        };

        const result = await createService(projectID, newService);

        expect(database.services.length).toEqual(oldLength + 1);
        expect(database.services[3].nome_servico).toEqual(newService.nome_servico);
        expect(result.data).toEqual(newService);
        expect(result.status).toEqual(201);
    });

    it("deve retornar um erro para serviço não criado", async() => {
        const projectID = 999999;
        
        const newService = {};

        try {
            await createService(projectID, newService);
        } catch (error) {
            const messageError = getErrorAPI(error);
            
            expect(messageError).toEqual("Dados imcompletos!");
            expect(error.status).toEqual(400);
        }
    });
});

describe("editProject", () => {
    it("deve retornar o projeto específicado editado com sucesso", async() => {
        const oldProject = { ...database.projects[1] };
        const oldLength = database.projects.length;

        const newEditedProject = {
            nome_projeto: "TesteProjeto02",
            orcamento_projeto: 4000,
            categoria_projeto: "Infraestrutura",
            id: 2
        };

        const result = await editProject(newEditedProject.id, newEditedProject);

        expect(database.projects.length).toEqual(oldLength)
        expect(newEditedProject.nome_projeto).toEqual(oldProject.nome_projeto)
        expect(result.data).not.toEqual(oldProject);
        expect(result.status).toEqual(200);
    });

    it("deve retornar um erro quando o projeto específicado não for editado", async() => {
        const projectID = 999999;
        const newEditedProject = {};

        try {
            await editProject(projectID, newEditedProject);
        } catch (error) {
            const messageError = getErrorAPI(error);
            
            expect(messageError).toEqual("Recurso não encontrado no servidor!");
            expect(error.status).toEqual(404);
        }
    });
});

describe("editStatusService", () => {
    it("deve retornar o serviço específicado com a chave status editada com sucesso", async() => {
        const oldService = { ...database.services[0] };

        const result = await editStatusService(oldService.id);

        expect(result.data.nome_servico).toEqual(oldService.nome_servico);
        expect(result.data.custo_servico).toEqual(oldService.custo_servico);
        expect(result.data.status).not.toEqual(oldService.status);
        expect(result.status).toEqual(200);
    });

    it("deve retornar um erro quando o status do serviço específicado não for editado", async() => {
        const serviceID = 999999;

        try {
            await editStatusService(serviceID);
        } catch (error) {
            const messageError = getErrorAPI(error);

            expect(messageError).toEqual("Recurso não encontrado no servidor!");
            expect(error.status).toEqual(404);
        };
    });
});

describe("deleteProject", () => {
    it("deve retornar uma lista sem o projeto exclúido", async() => {
        const projectID = database.projects[1].id;
        const oldLength = database.projects.length

        const result = await deleteProject(projectID);

        expect(result.data.length).toEqual(oldLength - 1);
        expect(result.status).toEqual(200);
    });

    it("deve retornar um erro quando o projeto específicado não for deletado", async() => {
        const projectID = 999999;

        try {
            await deleteProject(projectID);
        } catch (error) {
            const messageError = getErrorAPI(error);

            expect(messageError).toEqual("Recurso não encontrado no servidor!");
            expect(error.status).toEqual(404);
        };
    });
});

describe("deleteService", () => {
    it("deve retornar uma lista sem o serviço excluído", async() => {
        const serviceID = database.services[0].id;
        const oldLength = database.services.length;

        const result = await deleteService(serviceID);

        expect(result.data.length).toEqual(oldLength - 1);
        expect(result.status).toEqual(200);
    });

    it("deve retornar um erro quando o serviço específicado não for deletado", async() => {
        const serviceID = 999999;

        try {
            await deleteService(serviceID);
        } catch (error) {
            const messageError = getErrorAPI(error);

            expect(messageError).toEqual("Recurso não encontrado no servidor!");
            expect(error.status).toEqual(404);
        };
    });
});