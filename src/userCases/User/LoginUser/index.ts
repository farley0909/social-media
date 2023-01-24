import { UserRepository } from "../../../repositories/implementations/UserRepository"
import { LoginUserController } from "./LoginUserControler"
import { LoginUserUseCase } from "./LoginUserUseCase"


let repository = new UserRepository()
let loginUserUseCase = new LoginUserUseCase(repository)
let loginUserControler = new LoginUserController(loginUserUseCase)

export {loginUserControler, loginUserUseCase}