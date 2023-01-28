import { PostRepository } from "../../../repositories/implementations/PostRepository";
import { ListPhotoController } from "./controller";
import { ListPhotoUseCase } from "./useCase";

let repo = new PostRepository()
let listPhotosUseCase = new ListPhotoUseCase(repo)
let listPhotosController = new ListPhotoController(listPhotosUseCase)
export {listPhotosController, listPhotosUseCase}