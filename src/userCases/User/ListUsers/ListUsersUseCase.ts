import { IUserRepository } from "../../../repositories/interface/IUserRepository";

export class ListUsersUseCase {
    constructor(private repository:IUserRepository){}
    
    async execute(data?){
        if(data){
            console.log("Email recebido no useCase: ", data)
           return await this.repository.list(data)
        }else{
            return await this.repository.list(null)
        }
       
    }
}