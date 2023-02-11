import { UserRespositoryMock } from "../../../repositories/mock/userRepositoryMock";
import { LoginUserUseCase } from "./LoginUserUseCase";

let repo = new UserRespositoryMock()
let useCase = new  LoginUserUseCase(repo)

let userSaved
let userToSave
beforeAll(async ()=>{
    userToSave = {
        name:"João da silva",
        email:"test@gmail.com",
        password:"123"
    } 
    userSaved = await repo.save(userToSave)
})

describe('Trying to do a login', ()=>{
        test('Must return a login token', async ()=>{
            let result = await useCase.execute(userToSave)
            expect(result).toMatchObject({has_error:false})
        })
   
})
describe('Trying to do a login passing invalid credentials', ()=>{
    test('Must return a ResponseImplementation with an error', async ()=>{
        let result = await useCase.execute({
            email:'jt@gmail.com',
            name:"jota",
            password:'123'
        })
        expect(result).toMatchObject({has_error:true})
    })

})