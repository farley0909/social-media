import { CommentRepository } from "../../../repositories/implementations/CommentRepository";
import { AddCommentContoller } from "./controller";
import { AddCommentUseCase } from "./useCase";

let repository  = new CommentRepository()
let addCommentUseCase = new AddCommentUseCase(repository)
let addCommentController = new AddCommentContoller(addCommentUseCase)

export {addCommentController, addCommentUseCase}