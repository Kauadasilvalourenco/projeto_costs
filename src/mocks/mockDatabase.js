import { categories } from "./fixtures/categories";
import { projects } from "./fixtures/projects";
import { services } from "./fixtures/services";

export const database = {
    categories: [...categories],
    projects: [...projects],
    services: [...services]
};

export function mockGetCategories() {
    const categories = database.categories;

    if (!categories) {
        return {
            status: 404
        };
    };

    return {
        data: categories,
        status: 200
    };
};

export function mockGetProjects() {
    const projects = database.projects;

    if (!projects) {
        return {
            status: 404
        };
    };

    return {
        data: projects,
        status: 200
    }
};

export function mockGetProject(projectID) {
    const project = database.projects.find((project) => project.id === projectID);

    if (project === undefined) {
        return {
            status: 404
        }
    };

    return {
        data: project,
        status: 200
    };
};

export function mockGetServices(projectID) {
    const services = database.services.filter((services) => services.projectID === projectID);

    if (!services) {
        return {
            status: 404
        };
    };

    return {
        data: services,
        status: 200
    };
};

export function mockCreateProject(data) {
    let id = database.projects.length + 1;

    while (database.projects.find((project) => project.id === id)) {
        id++;
    };

    const newProject = {
        ...data,
        id: id
    };

    database.projects.push(newProject);

    return {
        data: newProject,
        status: 201
    };
};

export function mockCreateService(projectID, data) {
    let id = database.services.length + 1;

    while (database.services.find((service) => service.id === id)) {
        id++;
    };

    const newService = {
        projectID: projectID,
        status: "Pendente",
        ...data
    };

    database.services.push(newService);

    return {
        data: newService,
        status: 201
    };
};

export function mockEditProject(projectID, data) {
    const project = database.projects.find((project) => project.id === projectID);

    if (project === undefined) {
        return {
            status: 404
        };
    };

    Object.assign(project, data);

    return {
        data: project,
        status: 200
    };
};

export function mockEditStatusServices(serviceID) {
    const service = database.services.find((service) => service.id === serviceID);

    if (service === undefined) {
        return {
            status: 404
        };
    };

    service.status = "Concluído";

    return {
        data: service,
        status: 200
    };
};

export function mockDeleteProject(projectID) {
    const index = database.projects.findIndex((project) => project.id === projectID);

    if (index === -1) {
        return {
            status: 404
        };
    };

    const deleteProject = database.projects.splice(index, 1);

    return {
        data: deleteProject,
        status: 200
    };
};

export function mockDeleteService(serviceID) {
    const index = database.services.findIndex((service) => service.id === serviceID);

    if (index === -1) {
        return {
            status: 404
        };
    };

    const deleteService = database.services.splice(index, 1);

    return {
        data: deleteService,
        status: 200
    };
};