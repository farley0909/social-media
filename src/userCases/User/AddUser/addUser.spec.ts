import { UserRespositoryMock } from "../../../repositories/mock/userRepositoryMock";
import { AddUserCase } from "./AddUserCase";

let usMock = new UserRespositoryMock()

let useCase = new AddUserCase(usMock)
let user =  {
    email:'test@gmail.com',
    password: "123senha",
    name:"João da Silva"
}
describe("Trying to register an user", ()=>{
    test('Must return the data from the registered user', async ()=>{
        let result = await useCase.execute(user)
        await expect(result).toMatchObject({data:{email:user.email}, has_error:false})
    })
})
describe("Trying to register a duplicated user", ()=>{
    test('Must return an constraint duplicated error', async ()=>{
        let result = await useCase.execute(user)
        await expect(result).toMatchObject({data:'Email constraint failed', has_error:true})
    })
})
describe("Trying to register an user without an email field", ()=>{
    test('Must return an invalid email error', async ()=>{
        let user2 = {
            email:'',
            password:'123',
            name: "teste"
        }
        let result = await useCase.execute(user2)
        await expect(result).toMatchObject({data:'Invalid email', has_error:true})
    })
})


