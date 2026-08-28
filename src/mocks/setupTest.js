import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./server";
import { restoreInitialState } from "./mockDatabase";

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
    restoreInitialState();
});

afterAll(() => {
    server.close();
});