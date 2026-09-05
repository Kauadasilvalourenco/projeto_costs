import { http, HttpResponse } from "msw";
import { mockGetCategories } from "../mockDatabase";
import { baseURL } from "../../services/api";

export const handlersCategories = [
    http.get(`${baseURL}/categories`, () => {
        const categories = mockGetCategories();

        return HttpResponse.json(categories);
    })
];