import { CommentRepository } from "../../../repositories/implementations/CommentRepository";
import { ListCommentsController } from "./controller";
import { ListCommentsUseCase } from "./useCase";

let repo = new CommentRepository()
let listCommentsUseCase = new ListCommentsUseCase(repo)
let listCommentsController = new ListCommentsController(listCommentsUseCase)
export {listCommentsController, listCommentsUseCase}