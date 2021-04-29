import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppErrors";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayLoad {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const {sub: user_id} = verify(token, "664b2c45799cca71703f539b4e8152bc") as IPayLoad;
        
        const userRepository = new UsersRepository();

        const user = userRepository.findById(user_id);

        if(!user) {
            throw new AppError("User does not exists!", 401);
        }

        request.user = {
            id: user_id
        }

        next();
    }catch{
        throw new AppError("Invalid token!", 401)
    }
    
}