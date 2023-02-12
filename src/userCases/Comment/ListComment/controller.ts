import { ListCommentsUseCase } from "./useCase"


export class ListCommentsController {

    constructor(private useCase:ListCommentsUseCase){}

    async handle(request, response){
        let result = await this.useCase.execute()
        response.json(result)
    }

}