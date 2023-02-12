import { CommentDTO } from "../../userCases/Comment/AddComment/DTO"
import { ResponseImplementation } from "../../util/ResponseImplementation"

export interface ICommentRepository {
     save(data:CommentDTO):Promise<ResponseImplementation>
     delete(id:string):Promise<ResponseImplementation>
     list():Promise<ResponseImplementation>
     update(data):Promise<ResponseImplementation>
}