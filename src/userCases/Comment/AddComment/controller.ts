import { AddCommentUseCase } from "./useCase";

export class AddCommentContoller {

    constructor(private useCase:AddCommentUseCase){}

    async handle(request, response){
        let result = await this.useCase.execute(request.body)
        response.json(result)
    }

}