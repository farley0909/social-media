import { Request, Response } from "express"
import { ListUsersUseCase } from "./ListUsersUseCase"

export class ListUsersController {
    constructor(private useCase:ListUsersUseCase){}

    async handle(request:Request, response:Response){
        let result = await this.useCase.execute(request.params.token)
    
        return response.json(result)    
  
    }
}