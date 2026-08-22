import { http, HttpResponse } from "msw";
import { mockGetCategories } from "../mockDatabase";
import { baseURL } from "../../services/api";

export const handlersCategories = [
    http.get(`${baseURL}/categories`, () => {
        const categories = mockGetCategories();

        if (categories.status === 404) {
            return HttpResponse.json("error", {
                status: categories.status
            })
        }

        return HttpResponse.json(categories, {
            status: categories.status
        });
    })
];