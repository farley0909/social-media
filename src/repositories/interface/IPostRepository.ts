import { ResponseImplementation } from "../../util/ResponseImplementation"

export interface IPostRepository {
    save(data):Promise<ResponseImplementation>
    list():Promise<ResponseImplementation>
}