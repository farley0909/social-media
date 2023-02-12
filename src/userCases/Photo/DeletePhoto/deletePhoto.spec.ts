import { postRepositoryMock } from "../../../repositories/mock/postRepositoryMock";
import { DeletePhotoUseCase } from "./useCase";

let repo = new postRepositoryMock()
let useCase = new DeletePhotoUseCase(repo)

let postToSave = {
    autor: "123324",
    descricao: "teste",
    data: new Date(),
    imagem:"teste.png"
}
let savedPost
beforeAll(async ()=>{
    savedPost =await repo.save(postToSave)
})
describe("Trying to delete a Post", ()=>{
    test("Must return the data of the post deleted", async ()=>{
        let result = await useCase.execute(savedPost.data.id)
        expect(result).toMatchObject({data:{id:savedPost.data.id}, has_error:false})
    })
})
describe("Trying to delete a Post for the second time", ()=>{
    test("Must return a response implementation with an error", async ()=>{
        let result = await useCase.execute(savedPost.data.id)
        expect(result).toMatchObject({has_error:true})
    })
})
describe("Trying to delete a Post passing invalid id", ()=>{
    test("Must return an response implementation with an error", async ()=>{
        let result = await useCase.execute("idInvalidoTeste")
        expect(result).toMatchObject({data:"invalid id", has_error:true})
    })
})