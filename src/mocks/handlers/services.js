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
        const projectID = url.searchParams.get("projectID");
        const services = mockGetServices(projectID);

        if (services.status !== 200) {
            return HttpResponse.json("error", {
                status: services.status
            });
        };

        return HttpResponse.json(services, {
            status: services.status
        });
    }),

    http.post(`${baseURL}/services`, async({ request }) => {
        const data = await request.json();
        const projectID = Number(data.projectID);

        const newService = mockCreateService(projectID, data);

        if (newService.status !== 201) {
            return HttpResponse.json("error", {
                status: newService.status
            });
        };

        return HttpResponse.json(newService, {
            status: newService.status
        });
    }),

    http.patch(`${baseURL}/services/:id`, ({ params }) => {
        const serviceID = Number(params.id);

        const editedService = mockEditStatusServices(serviceID);

        if (editedService.status !== 200) {
            return HttpResponse.json("error", {
                status: editedService.status
            });
        };

        return HttpResponse.json(editedService, {
            status: editedService.status
        });
    }),

    http.delete(`${baseURL}/services/:id`, ({ params }) => {
        const serviceID = Number(params.id);

        const deletedService = mockDeleteService(serviceID);

        if (deletedService.status !== 200) {
            return HttpResponse.json("error", {
                status: deletedService.status
            });
        };

        return HttpResponse.json(deletedService, {
            status: deletedService.status
        });
    })
]