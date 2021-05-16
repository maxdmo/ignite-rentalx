import { CreateRentalUseCase } from "./CreateRentalController";

let createRentalUseCase: CreateRentalUseCase;

describe("Create a rental", () => {
    beforeEach(() => {
        createRentalUseCase = new CreateRentalUseCase();
    });

    it("Should be able to create a new rental", async () => {
        await createRentalUseCase.execute();
    });
});
