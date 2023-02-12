import { postRepositoryMock } from "../../../repositories/mock/postRepositoryMock"
import { ListPhotoUseCase } from "./useCase"

let repo = new postRepositoryMock()
let useCase = new ListPhotoUseCase(repo)
let postToSave = {
    autor: "123324",
    descricao: "teste",
    data: new Date(),
    imagem:"teste.png"
}
beforeAll(async ()=>{
    repo.save(postToSave)
    postToSave.autor="1222222"
    repo.save(postToSave)
})


describe('Trying to get posts', ()=>{
    test("Must return a ResponseImplementation with an Array of posts",async ()=>{
        let result = await useCase.execute()
        expect(result).toMatchObject({has_error:false})
    })
})