import { Request, Response } from "express"
import { stringify } from "querystring"
import { DeleteUserUseCase } from "./deleteUserUseCase"

export class DeleteUserController {
    constructor(private useCase:DeleteUserUseCase){}

    async handle(request:Request, response:Response){
        let {id} = request.query
        let result = await this.useCase.execute(id)
        return response.json(result)    
  
    }
}