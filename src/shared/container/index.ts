import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsImagesRepository } from "@modules/cars/interfaces/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/interfaces/ICarsRepository";
import { ICategoriesRespository } from "@modules/cars/interfaces/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/interfaces/ISpecificationsRepository";

container.registerSingleton<ICategoriesRespository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
);
