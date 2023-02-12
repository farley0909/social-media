import { ICommentRepository } from "../../../repositories/interface/ICommentRepository";

export class DeleteCommentUseCase {
    constructor(private repository:ICommentRepository){}

    async execute(id:string){
        let result = await this.repository.delete(id)
        return result
    }
}