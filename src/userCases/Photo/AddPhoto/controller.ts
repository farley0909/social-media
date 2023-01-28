import { Request, Response } from "express";
import { listPhotosUseCase } from "../ListPhotos";
import { AddPhotoUseCase } from "./useCase";

export class AddPhotoController {
    constructor(private useCase:AddPhotoUseCase){}

    async handle(request:any, response:Response){
        try {
            request.body.imagem = request.file.filename
            let result =  await this.useCase.execute(request.body)
            let posts = await listPhotosUseCase.execute() 
            response.redirect("/api/user/home/")
          } catch (error) {
            response.status(400).json({status:error.message})
          }
    }
}
