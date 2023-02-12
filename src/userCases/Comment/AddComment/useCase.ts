import { ICommentRepository } from "../../../repositories/interface/ICommentRepository";
import { CommentDTO } from "./DTO";

export class AddCommentUseCase {
    constructor(private repository:ICommentRepository){}

    async execute(data:CommentDTO){
        let result = await this.repository.save(data)
        return result
    }
}