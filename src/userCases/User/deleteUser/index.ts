import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { DeleteUserController } from "./deleteUserController";
import { DeleteUserUseCase } from "./deleteUserUseCase";

let repository = new UserRepository()
let deleteUserUseCase = new DeleteUserUseCase(repository)
let deleteUserController = new DeleteUserController(deleteUserUseCase)

export {deleteUserController, deleteUserUseCase}