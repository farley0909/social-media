import { DeleteCommentUseCase } from "./useCase"


export class DeleteCommentController {

    constructor(private useCase:DeleteCommentUseCase){}

    async handle(request, response){
        let result = await this.useCase.execute(request.body.id)
        response.json(result)
    }

}