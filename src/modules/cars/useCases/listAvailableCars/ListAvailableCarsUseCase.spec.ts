import { CarsRepositoryInMemory } from "@modules/cars/infra/typeorm/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Teste",
            description: "Car Description test",
            daily_rate: 140,
            license_plate: "DEF-TEST",
            fine_amount: 100,
            brand: "Audi",
            category_id: "d3e0e292-d6b8-4472-981e-83c5a5d4c52e",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Teste",
            description: "Car Description test",
            daily_rate: 140,
            license_plate: "DEF-TEST",
            fine_amount: 100,
            brand: "Car brand test",
            category_id: "d3e0e292-d6b8-4472-981e-83c5a5d4c52e",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car brand test",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Teste 3",
            description: "Car Description test",
            daily_rate: 140,
            license_plate: "DEF-TEST",
            fine_amount: 100,
            brand: "Car brand test",
            category_id: "d3e0e292-d6b8-4472-981e-83c5a5d4c52e",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car Teste 3",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Teste 3",
            description: "Car Description test",
            daily_rate: 140,
            license_plate: "DEF-TEST",
            fine_amount: 100,
            brand: "Car brand test",
            category_id: "12345",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });

        expect(cars).toEqual([car]);
    });
});
