import { CommentRepositoryMock } from "../../../repositories/mock/commentRepositoryMock"
import { ListCommentsUseCase } from "./useCase"


let repo = new CommentRepositoryMock()
let useCase = new ListCommentsUseCase(repo)

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

describe("trying to get all comments logged", ()=>{
    test("Must return a ResponseImplementation with the comment's data", async ()=>{
        let result = await useCase.execute()
        console.log(result)
        expect(result).toMatchObject({has_error:false})
    })
})
