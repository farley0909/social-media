import { ICommentRepository } from "../../../repositories/interface/ICommentRepository"
import { updateCommentDTO } from "./DTO"

export class UpdateCommentUseCase {
    constructor(private repository:ICommentRepository){}

    async execute(data:updateCommentDTO){
        let result = await this.repository.update(data)
        return result
    }
}