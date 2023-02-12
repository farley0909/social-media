import { CommentRepository } from "../../../repositories/implementations/CommentRepository";
import { UpdateCommentController } from "./Controller";
import { UpdateCommentUseCase } from "./UseCase";

let repo = new CommentRepository()
let updateCommentUseCase = new UpdateCommentUseCase(repo)
let updateCommentController = new UpdateCommentController(updateCommentUseCase)
export {updateCommentController, updateCommentUseCase}