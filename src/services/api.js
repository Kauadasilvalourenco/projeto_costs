export const baseURL = "https://projeto-costs-back-end-n9bu.onrender.com";

async function request(endpoint, options = {}) {
    let timeout;
    const method = options.method || "GET".toUpperCase();

    if (method === "GET") {
        timeout = 90000;
    } else {
        timeout = 5000;
    }

    const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,

        signal: AbortSignal.timeout(timeout),

        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    if (!response.ok) {
        const errorAPI = new Error(`Erro na API: ${response.status}`);
        errorAPI.status = response.status;
        throw errorAPI;
    };

    return await response.json();
};

export function getErrorAPI(errorApi) {
    let messageError;

    if (!errorApi || !errorApi.status) {
        messageError = "Servidor indisponível ou falha na conexão de internet!";

        return messageError;
    };

    switch (errorApi.status) {
        case 400:
            messageError = "Dados imcompletos!";
            break;
        case 404:
            messageError = "Recurso não encontrado no servidor!";
            break;
        case 500:
            messageError = "Falha interna no servidor!";
            break;
        case 503:
            messageError = "Servidor indisponível no momento!";
            break;

        default:
            messageError = `Ocorreu um erro inesperado: ${errorApi.status}`;
            break;
    };

    return messageError;
};

//GET
export function getCategories() {
    return request("/categories");
};

export function getProjects() {
    return request("/projects");
};

export function getProject(id) {
    return request(`/projects/${id}`);
};

export function getServices(projectID) {
    return request(`/services?projectID=${projectID}`);
};

//POST
export function createProject(data) {
    return request("/projects", {
        method: "POST",
        body: JSON.stringify(data)
    });
};

export function createService(projectID, data) {
    return request(`/services`, {
        method: "POST",
        body: JSON.stringify({
            projectID: projectID,
            status: "Pendente",
            ...data
        })
    });
};

//PUT & PATCH
export function editProject(projectID, data) {
    return request(`/projects/${projectID}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
};

export function editStatusService(serviceID) {
    return request(`/services/${serviceID}`, {
        method: "PATCH",
        body: JSON.stringify({
            status: "Concluído"
        })
    });
};

//DELETE
export function deleteProject(id) {
    return request(`/projects/${id}`, {
        method: "DELETE"
    });
};

export function deleteService(serviceID) {
    return request(`/services/${serviceID}`, {
        method: "DELETE",
    });
};