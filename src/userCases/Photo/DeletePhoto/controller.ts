import { DeletePhotoUseCase } from "./useCase"
import {Request, Response} from 'express'
export class DeletePhotoController {
    constructor(private useCase:DeletePhotoUseCase){}

    async handle(request:any, response:Response){
        try {
            let result = await this.useCase.execute(request.body.id)
            response.json(result)
        } catch (error) {
            response.status(400).json({status:error.message})
        }
    }
}


