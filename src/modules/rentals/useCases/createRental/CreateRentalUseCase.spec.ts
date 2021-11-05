import dayjs from "dayjs";

import { AppError } from "@errors/AppErrors";
import { CarsRepositoryInMemory } from "@modules/cars/infra/typeorm/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create a rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();

        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car TEst",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car TEst",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand",
        });

        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        const newRental = createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        await expect(newRental).rejects.toEqual(
            new AppError("There's a rental in progress for user!")
        );
    });

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "1111",
            expected_return_date: dayAdd24Hours,
            user_id: "123455",
        });

        const duplicatedCar = createRentalUseCase.execute({
            user_id: "12345",
            car_id: "1111",
            expected_return_date: dayAdd24Hours,
        });

        await expect(duplicatedCar).rejects.toEqual(
            new AppError("Car is unavailable.")
        );
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        const rental = createRentalUseCase.execute({
            user_id: "123455",
            car_id: "111222",
            expected_return_date: dayjs().toDate(),
        });

        await expect(rental).rejects.toEqual(
            new AppError("The rent has to be a minimum of 24 hours")
        );
    });
});
