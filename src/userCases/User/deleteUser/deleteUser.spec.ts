import { UserRespositoryMock } from "../../../repositories/mock/userRepositoryMock";
import { DeleteUserUseCase } from "./deleteUserUseCase";

let usMock = new UserRespositoryMock()

let useCase = new DeleteUserUseCase(usMock)
let user
beforeAll(async ()=>{
    let dataToSave = {
        name:"João da Silva",
        email: "joao123@gmmail.com",
        password:'123'
    }
    user = await usMock.save(dataToSave)
})
describe('Trying to delete an user passing an invalid id',()=>{
    test('Must return an error of invalid id', async ()=>{
        let result = await useCase.execute('werwer123')
        expect(result).toMatchObject({data:'invalid id', has_error:true})
    })
})

describe('Trying to delete an user',()=>{
    test('Must return the data of the deleted user', async ()=>{
        let result = await useCase.execute(user.data.id)
        expect(result).toMatchObject({data:{email:user.data.email}, has_error:false})
    })
})
describe('Trying to delete the same user for the second time',()=>{
    test('Must return an error of invalid id', async ()=>{
        let result = await useCase.execute(user.data.id)
        expect(result).toMatchObject({data:'invalid id', has_error:true})
    })
})


