import { Request, Response } from "express"
import { ListUsersUseCase } from "./ListUsersUseCase"

export class ListUsersController {
    constructor(private useCase:ListUsersUseCase){}

    async handle(request:Request, response:Response){
        let result
        if(request.query.email){
            console.log("veio email: ", request.query.email)
            result = await this.useCase.execute(request.query.email)
        }else{
            result = await this.useCase.execute()    
        }
        console.log(result)
        return response.json(result)    
  
    }
}