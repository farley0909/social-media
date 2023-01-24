import { LoginUserDTO } from "../../userCases/User/LoginUser/LoginUserDTO"
import { ResponseImplementation } from "../../util/ResponseImplementation"

export interface IUserRepository {
    save(AddUserDTO):Promise<ResponseImplementation>
    list(email:string):Promise<ResponseImplementation>
    delete(id:string):Promise<ResponseImplementation>
    login(data:LoginUserDTO):Promise<ResponseImplementation>
}