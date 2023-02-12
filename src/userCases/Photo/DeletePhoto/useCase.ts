import { IPostRepository } from "../../../repositories/interface/IPostRepository";

export class DeletePhotoUseCase {
    constructor(private repo: IPostRepository){}

    execute(id:string){
        let result = this.repo.delete(id)
        return result
    }

}