const baseURL = "http://localhost:5000";

async function request(endpoint, options = {}) {
    const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,

        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
    };

    return await response.json();
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