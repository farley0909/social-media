import { listUsersUseCase } from "."
import { UserRespositoryMock } from "../../../repositories/mock/userRepositoryMock"
import { ListUsersUseCase } from "./ListUsersUseCase"

let usMock = new UserRespositoryMock()

let useCase =  new ListUsersUseCase(usMock)
let loginResult
let save
beforeAll(async ()=>{
    let dataToLogin = {
        name:"João",
        email:"test@gmail.com",
        password:"123"
    }
    save = await usMock.save(dataToLogin)
    loginResult = await  usMock.login(dataToLogin)
})
describe("Trying to get data from an user with your login token", ()=>{
    test("Must return a ResponseImplementation with the user's data", async ()=>{
        let result =await useCase.execute(loginResult.data)
        expect(result).toMatchObject({data:{email:save.data.email}, has_error:false})
    })
})
describe("Trying to get data from an user passing an invalid token", ()=>{
    test("Must return a ResponseImplementation with an error", async ()=>{
        let result =await useCase.execute('tokeninvalido123')
        console.log(result)
        expect(result).toMatchObject({has_error:true})
    })
})


