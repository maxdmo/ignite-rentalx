import { Category } from "../models/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRespository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRespository, ICreateCategoryDTO };
