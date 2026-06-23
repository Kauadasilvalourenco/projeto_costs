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

//POST
export function createProject(data) {
    return request("/projects", {
        method: "POST",
        body: JSON.stringify(data)
    })
}