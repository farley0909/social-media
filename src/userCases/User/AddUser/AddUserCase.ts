import { IUserRepository } from "../../../repositories/interface/IUserRepository";
import { AdduserDTO } from "./AddUserDTO";

export class AddUserCase {
    constructor(private repository:IUserRepository){}
    
    async execute(data:AdduserDTO){
       return await this.repository.save(data)
    }
}