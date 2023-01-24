import { IUserRepository } from "../../../repositories/interface/IUserRepository";
import { LoginUserDTO } from "./LoginUserDTO";

export class LoginUserUseCase {
    constructor(private repository:IUserRepository){}
    
    async execute(data:LoginUserDTO){
       return await this.repository.login(data)
    }
}