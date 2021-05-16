import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRespository } from "@modules/cars/interfaces/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRespository
    ) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };
