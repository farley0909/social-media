import { PostRepository } from "../../../repositories/implementations/PostRepository";
import { AddPhotoController } from "./controller";
import { AddPhotoUseCase } from "./useCase";

let repository = new PostRepository()
let adddPhotoUseCase = new AddPhotoUseCase(repository)
let addPhotoController = new AddPhotoController(adddPhotoUseCase)

export {addPhotoController, adddPhotoUseCase}