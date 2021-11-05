import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppErrors";
import { ICarsRepository } from "@modules/cars/interfaces/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/interfaces/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const compareMinimumHours = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new AppError("Car is unavailable.");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
            user_id
        );

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!");
        }

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        );

        if (compare < compareMinimumHours) {
            throw new AppError("The rent has to be a minimum of 24 hours");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase };
