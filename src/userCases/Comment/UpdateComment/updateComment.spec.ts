import { CommentRepositoryMock } from "../../../repositories/mock/commentRepositoryMock"
import { UpdateCommentUseCase } from "./UseCase"

let repo = new CommentRepositoryMock()
let useCase = new UpdateCommentUseCase(repo)

let commentSaved
beforeAll(async ()=>{
    commentSaved = await repo.save({
        autor:"234dsfdsaf",
        comentario:"Trying to comment",
        data: new Date(),
        foto: "teste.png",
        id:"123"
    })
})

describe("Trying to update a comment", ()=>{
    test("Must return a Response implementation with the comment's data", async ()=>{
        let editedComment = commentSaved.data
        editedComment.autor = "123"
        editedComment.foto="Edited test"
        
        let result = await useCase.execute(editedComment)
        console.log(result)
        expect(result).toMatchObject({has_error:false})
    })
})
describe("Trying to update a comment sendding an invalid comment id", ()=>{
    test("Must return a Response implementation with an error", async ()=>{
        let editedComment2 = {
            autor:"123",
            comentario:"Edited comment 3",
            data: "23423423",
            foto: "teste.png",
            id:"000000000"
        } 
        let result = await useCase.execute(editedComment2)
        expect(result).toMatchObject({has_error:true})
    })
})