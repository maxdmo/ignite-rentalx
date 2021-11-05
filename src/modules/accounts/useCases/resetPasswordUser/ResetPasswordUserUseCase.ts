import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppErrors";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,

        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({ token, password }: IRequest) {
        const userToken = await this.usersTokenRepository.findByRefreshToken(
            token
        );

        if (!userToken) {
            throw new AppError("Token invalid!");
        }

        if (
            this.dateProvider.compareIfBefore(
                userToken.expires_date,
                this.dateProvider.dateNow()
            )
        ) {
            throw new AppError("Token expired!");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokenRepository.deleteById(userToken.user_id);
    }
}

export { ResetPasswordUserUseCase };
