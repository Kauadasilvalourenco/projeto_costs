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

        if (projects.status !== 200) {
            return HttpResponse.json("error", {
                status: projects.status
            });
        };

        return HttpResponse.json(projects, {
            status: projects.status
        });
    }),

    http.get(`${baseURL}/projects/:id`, ({ params }) => {
        const projectID = Number(params.id);

        const project = mockGetProject(projectID);

        if (project.status !== 200) {
            return HttpResponse.json("error", {
                status: project.status
            });
        };

        return HttpResponse.json(project, {
            status: project.status
        });
    }),

    http.post(`${baseURL}/projects`, async({ request }) => {
        const data = await request.json();

        const newProject = mockCreateProject(data);

        if (newProject.status !== 201) {
            return HttpResponse.json("error", {
                status: newProject.status
            });
        };

        return HttpResponse.json(newProject, {
            status: newProject.status
        });
    }),

    http.put(`${baseURL}/projects/:id`, async({ params, request }) => {
        const projectID = Number(params.id);
        const data = await request.json();

        const editedProject = mockEditProject(projectID, data);

        if (editedProject.status !== 200) {
            return HttpResponse.json("error", {
                status: editedProject.status
            });
        };

        return HttpResponse.json(editedProject, {
            status: editedProject.status
        });
    }),

    http.delete(`${baseURL}/projects/:id`, ({ params }) => {
        const projectID = Number(params.id);

        const deletedProject = mockDeleteProject(projectID);

        if (deletedProject.status !== 200) {
            return HttpResponse.json("error", {
                status: deletedProject.status
            });
        };

        return HttpResponse.json(deletedProject, {
            status: deletedProject.status
        });
    })
];