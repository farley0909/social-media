import { UpdateCommentUseCase } from "./UseCase"

export class UpdateCommentController {

    constructor(private useCase:UpdateCommentUseCase){}

    async handle(request, response){
        let result = await this.useCase.execute(request.body)
        response.json(result)
    }

}