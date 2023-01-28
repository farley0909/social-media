import { IPostRepository } from "../../../repositories/interface/IPostRepository";
import { AddPhotoDTO } from "./AddPhotoDTO";

export class AddPhotoUseCase {
    constructor(private repository:IPostRepository){}
    
    async execute(data:AddPhotoDTO){
       return await this.repository.save(data)
    }
}