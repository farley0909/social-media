import { IUserRepository } from "../../../repositories/interface/IUserRepository"

export class DeleteUserUseCase {
    constructor(private repository:IUserRepository){}
    
    async execute(id){
           return await this.repository.delete(id)
    }
}