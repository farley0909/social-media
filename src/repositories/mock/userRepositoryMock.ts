import { mockPrisma } from "./mockPrisma";
import { AdduserDTO } from "../../userCases/User/AddUser/AddUserDTO";
import { ResponseImplementation } from "../../util/ResponseImplementation";
import { IUserRepository } from "../interface/IUserRepository";
import bcrypt from 'bcrypt'
import { LoginUserDTO } from "../../userCases/User/LoginUser/LoginUserDTO";
import jwt from 'jsonwebtoken'





export class UserRespositoryMock implements IUserRepository {
    prisma:mockPrisma
    constructor(){
        this.prisma = new mockPrisma()
    }
    async save(data: AdduserDTO){
        try {
            if(data.email.length <= 0) throw new Error('Invalid email')       
            let encryptedPassword = await bcrypt.hash(data.password, 12)
            let userSaved = await this.prisma.user.create({
                name: data.name,
                password: encryptedPassword,
                email: data.email
            })
            return await new ResponseImplementation(userSaved, false)

        } catch (error) {
            return await new ResponseImplementation(error.message, true)
        }
    }
    async list(token){
        try {
            let decode = await jwt.decode(token, "projetopw1")
            let userInfo = await this.prisma.user.findUnique({email:decode.email})

            return new ResponseImplementation(userInfo, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)
        }
       
    }
    async delete(id){
        try {
            let exist = await this.prisma.user.findUnique({id:id})
            if(!exist){
                throw new Error('invalid id')
            }
            let result = await this.prisma.user.delete({id:id})
            let response = new ResponseImplementation(result, false)
            return response
        } catch (error) {
            return await new ResponseImplementation(error.message, true)
        }
    }
    async login(data:LoginUserDTO){
        try {
            let searchForThisUSer = await this.prisma.user.findUnique({email:data.email})
            console.log(searchForThisUSer)
            if(searchForThisUSer){
                let senhaValida = await bcrypt.compare(data.password, searchForThisUSer.password)
                if(senhaValida && data.email == searchForThisUSer.email){
                    
                    let token = jwt.sign(data, "projetopw1");
                    return new ResponseImplementation(token, false)
                }else{
                    return new ResponseImplementation('Senha ou email inválido', true)
                }
            }else{
                return new ResponseImplementation('Esse usuário não está cadastrado no sistema', true)
            }
        } catch (error) {
            return new ResponseImplementation(error.message, true)
        }
    }

}