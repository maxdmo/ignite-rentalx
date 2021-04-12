/* eslint-disable import/no-extraneous-dependencies */
import { Router } from "express";
import { v4 as uuidV4 } from "uuid";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    categories.push({
        id: uuidV4(),
        name,
        description,
    });

    return response.status(201).send();
});

export { categoriesRoutes };
