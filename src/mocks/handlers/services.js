import { http, HttpResponse } from "msw";
import {
    mockGetServices,
    mockCreateService,
    mockEditStatusServices,
    mockDeleteService
} from "../mockDatabase";
import { baseURL } from "../../services/api";

export const handlersServices = [
    http.get(`${baseURL}/services`, ({ request }) => {
        const url = new URL(request.url);
        const projectID = Number(url.searchParams.get("projectID"));
        const services = mockGetServices(projectID);

        return HttpResponse.json(services);
    }),

    http.post(`${baseURL}/services`, async({ request }) => {
        const data = await request.json();
        const projectID = Number(data.projectID);

        const newService = mockCreateService(projectID, data);

        return HttpResponse.json(newService);
    }),

    http.patch(`${baseURL}/services/:id`, ({ params }) => {
        const serviceID = Number(params.id);

        const editedService = mockEditStatusServices(serviceID);

        return HttpResponse.json(editedService);
    }),

    http.delete(`${baseURL}/services/:id`, ({ params }) => {
        const serviceID = Number(params.id);

        const deletedService = mockDeleteService(serviceID);

        return HttpResponse.json(deletedService);
    })
]