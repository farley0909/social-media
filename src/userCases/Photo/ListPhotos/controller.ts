import { Request, Response } from "express";
import { ListPhotoUseCase } from "./useCase";


export class ListPhotoController {
    constructor(private useCase:ListPhotoUseCase){}

    async handle(request:any, response:Response){
        let result = await this.useCase.execute()
    
        return response.json(result) 
    }  
}
