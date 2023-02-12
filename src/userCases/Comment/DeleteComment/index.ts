import { CommentRepository } from "../../../repositories/implementations/CommentRepository";
import { DeleteCommentController } from "./controller";
import { DeleteCommentUseCase } from "./useCase";

let repo = new CommentRepository()
let deleteCommentUseCase = new DeleteCommentUseCase(repo)
let deleteCommentController = new DeleteCommentController(deleteCommentUseCase)
export {deleteCommentController, deleteCommentUseCase}