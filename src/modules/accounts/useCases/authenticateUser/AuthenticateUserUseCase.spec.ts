import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDtO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            password: "1234",
            name: "User Test",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate a nonexistent user", async () => {
        const user = authenticateUserUseCase.execute({
            email: "false@email.com",
            password: "1234",
        });

        await expect(user).rejects.toEqual(
            new AppError("Email or password incorrect!")
        );
    });

    it("should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "9999",
            email: "user@user.com",
            password: "1234",
            name: "User Test Error",
        };

        await createUserUseCase.execute(user);

        const authUser = authenticateUserUseCase.execute({
            email: user.email,
            password: "1111",
        });
        await expect(authUser).rejects.toEqual(
            new AppError("Email or password incorrect!")
        );
    });
});
