import { CommentRepositoryMock } from "../../../repositories/mock/commentRepositoryMock"
import { AddCommentUseCase } from "./useCase"

let repo = new CommentRepositoryMock()
let useCase = new AddCommentUseCase(repo)



describe("Trying to add a comment to a post", ()=>{
    test("Must return a ResponseImplementation with the comment's data",async ()=>{
        let commentToSave = {
            autor:"234dsfdsaf",
            comentario:"Trying to comment",
            data: new Date(),
            foto: "teste.png",
            id:"123"
        }
        let result = await useCase.execute(commentToSave)
        expect(result).toMatchObject({data:{autor:commentToSave.autor}, has_error:false})
    })
})