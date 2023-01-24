import { Request, Response } from "express";
import { AddUserCase } from "./AddUserCase";

export class AddUserController {
    constructor(private useCase:AddUserCase){}

    async handle(request:Request, response:Response){
        console.log(request.body)
        let result =  await this.useCase.execute(request.body)
        return response.json(result)
        
    }
}