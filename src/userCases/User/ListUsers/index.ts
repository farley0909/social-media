import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { ListUsersController } from "./ListUsersController";
import { ListUsersUseCase } from "./ListUsersUseCase";

let repository = new UserRepository()

let listUsersUseCase = new ListUsersUseCase(repository)
let listUsersController = new ListUsersController(listUsersUseCase)

export {listUsersController, listUsersUseCase}