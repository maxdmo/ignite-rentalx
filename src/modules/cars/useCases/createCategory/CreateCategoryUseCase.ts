import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppErrors";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRespository
    ) {}

    async execute({ description, name }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(
            name
        );

        if (categoryAlreadyExists) {
            throw new AppError("Category already exists!");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
