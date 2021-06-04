import dayjs from "dayjs";

import { AppError } from "@errors/AppErrors";
import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create a rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();

        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "111222",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open to the same user", () => {
        expect(async () => {
            const rental1 = await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "111222",
                expected_return_date: dayAdd24Hours,
            });

            const rental2 = await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "11123322",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental if there is another open to the same car", () => {
        expect(async () => {
            const rental1 = await createRentalUseCase.execute({
                user_id: "123455",
                car_id: "111222",
                expected_return_date: dayAdd24Hours,
            });

            const rental2 = await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "111222",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental with invalid return time", () => {
        expect(async () => {
            const rental1 = await createRentalUseCase.execute({
                user_id: "123455",
                car_id: "111222",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
