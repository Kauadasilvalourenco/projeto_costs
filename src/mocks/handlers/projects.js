import { http, HttpResponse } from "msw";
import {
    mockGetProjects, mockGetProject,
    mockCreateProject,
    mockEditProject,
    mockDeleteProject
} from "../mockDatabase";
import { baseURL } from "../../services/api";

export const handlersProjects = [
    http.get(`${baseURL}/projects`, () => {
        const projects = mockGetProjects();

        return HttpResponse.json(projects);
    }),

    http.get(`${baseURL}/projects/:id`, ({ params }) => {
        const projectID = Number(params.id);

        const project = mockGetProject(projectID);

        return HttpResponse.json(project);
    }),

    http.post(`${baseURL}/projects`, async({ request }) => {
        const data = await request.json();

        const newProject = mockCreateProject(data);

        return HttpResponse.json(newProject);
    }),

    http.put(`${baseURL}/projects/:id`, async({ params, request }) => {
        const projectID = Number(params.id);
        const data = await request.json();

        const editedProject = mockEditProject(projectID, data);

        return HttpResponse.json(editedProject);
    }),

    http.delete(`${baseURL}/projects/:id`, ({ params }) => {
        const projectID = Number(params.id);

        const deletedProject = mockDeleteProject(projectID);

        return HttpResponse.json(deletedProject);
    })
];