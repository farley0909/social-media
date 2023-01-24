import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { AddUserCase } from "./AddUserCase";
import { AddUserController } from "./AddUserController";

let repository = new UserRepository()
let addUserUseCase = new AddUserCase(repository)
let addUserController = new AddUserController(addUserUseCase)

export {addUserController, addUserUseCase}