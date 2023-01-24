import { Request, Response } from "express";
import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
    constructor(private useCase:LoginUserUseCase){}

    async handle(request:Request, response:Response){
        console.log(request.body)
        let result =  await this.useCase.execute(request.body)
        return response.json(result)
        
    }
}