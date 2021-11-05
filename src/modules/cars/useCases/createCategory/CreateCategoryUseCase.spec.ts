import { CategoriesRepositoryInMemory } from "@modules/cars/infra/typeorm/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description test",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new category with name exists", async () => {
        const category = {
            name: "Category Test",
            description: "Category description test",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const duplicatedCategory = createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        await expect(duplicatedCategory).rejects.toEqual(
            new AppError("Category already exists!")
        );
    });
});
