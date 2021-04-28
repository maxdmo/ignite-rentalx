import { ICreateUserDTO } from "../dtos/ICreateUserDtO";
import { User } from "../entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUsersRepository };
