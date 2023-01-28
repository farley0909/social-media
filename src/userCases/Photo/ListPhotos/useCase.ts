import { IPostRepository } from "../../../repositories/interface/IPostRepository";


export class ListPhotoUseCase {
    constructor(private repository:IPostRepository){}
    
    async execute(){
       return await this.repository.list()
    }
}