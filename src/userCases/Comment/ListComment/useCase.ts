import { ICommentRepository } from "../../../repositories/interface/ICommentRepository";

export class ListCommentsUseCase {
    constructor(private repository:ICommentRepository){}

    async execute(){
        let result = await this.repository.list()
        return result
    }
}