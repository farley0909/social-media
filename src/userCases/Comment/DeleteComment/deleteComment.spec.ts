import { CommentRepositoryMock } from "../../../repositories/mock/commentRepositoryMock"
import { DeleteCommentUseCase } from "./useCase"

let repo = new CommentRepositoryMock()
let useCase = new DeleteCommentUseCase(repo)

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



describe("Trying to delete a comment", ()=>{
    test("Must return a Response implementation with the deleted comment", async ()=>{
        let result = await useCase.execute(commentSaved.data.id)
        expect(result).toMatchObject({has_error:false})
    })
})
describe("Trying to delete a comment for the second time", ()=>{
    test("Must return a Response implementation with an error", async ()=>{
        let result = await useCase.execute(commentSaved.data.id)
        expect(result).toMatchObject({has_error:true})
    })
})
describe("Trying to delete a comment passing invalid id", ()=>{
    test("Must return a Response implementation with an error", async ()=>{
        let result = await useCase.execute("Invalid id")
        expect(result).toMatchObject({has_error:true})
    })
})