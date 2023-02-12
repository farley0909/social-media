import { postRepositoryMock } from "../../../repositories/mock/postRepositoryMock"
import { UserRespositoryMock } from "../../../repositories/mock/userRepositoryMock"
import { AddPhotoUseCase } from "./useCase"
let repository = new postRepositoryMock
let useCase = new AddPhotoUseCase(repository)
let userRepository = new UserRespositoryMock()

let userToSave = {
    name:"joão da Silva",
    email:"test@gmail.com",
    password:"123"
}
let userSaved
beforeAll(async ()=>{
    userSaved = await userRepository.save(userToSave)
})

describe("Trying to post an photo", ()=>{
    test("Must return the post's data", async ()=>{
        let dataToSave = {
            autor: userSaved.data.id,
            descricao: 'My first post',
            data: new Date(),
            imagem:"123.png"
        }
        let result = await useCase.execute(dataToSave)
        expect(result).toMatchObject({has_error:false})
    })
})
