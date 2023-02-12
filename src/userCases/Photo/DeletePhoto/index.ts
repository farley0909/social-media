import { PostRepository } from "../../../repositories/implementations/PostRepository";
import { DeletePhotoController } from "./controller";
import { DeletePhotoUseCase } from "./useCase";

let repo = new PostRepository()
let deletePhotoUseCase = new DeletePhotoUseCase(repo)
let deletePhotoController = new DeletePhotoController(deletePhotoUseCase)
export {deletePhotoController, deletePhotoUseCase}