import { setupServer } from "msw/node";
import { handlersCategories } from "./handlers/categories";
import { handlersProjects } from "./handlers/projects";
import { handlersServices } from "./handlers/services";

export const server = setupServer(
    ...handlersCategories,
    ...handlersProjects,
    ...handlersServices
);