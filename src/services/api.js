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
    return request(`/projects/${id}`)
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

export function createServices(projectID, data) {
    return request("/services", {
        method: "POST",
        body: JSON.stringify({
            ...data,
            projectID: projectID
        })
    });
};

//PUT
export function editProject(id, data) {
    return request(`/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
};

//DELETE
export function deleteProject(id) {
    return request(`/projects/${id}`, {
        method: "DELETE"
    });
};