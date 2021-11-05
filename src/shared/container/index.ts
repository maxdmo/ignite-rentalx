import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/repositories/implementations/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsImagesRepository } from "@modules/cars/interfaces/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/interfaces/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/interfaces/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/interfaces/ISpecificationsRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/interfaces/IRentalsRepository";

import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "./providers/DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<ICategoriesRepository>(
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

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);
