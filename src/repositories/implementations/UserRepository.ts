import { prisma } from "../../database";
import { AdduserDTO } from "../../userCases/User/AddUser/AddUserDTO";
import { ResponseImplementation } from "../../util/ResponseImplementation";
import { IUserRepository } from "../interface/IUserRepository";
import bcrypt from 'bcrypt'
import { LoginUserDTO } from "../../userCases/User/LoginUser/LoginUserDTO";
import jwt from 'jsonwebtoken'
export class UserRepository implements IUserRepository {
    async save(data: AdduserDTO){
        try {       
            let encryptedPassword = await bcrypt.hash(data.password, 12)
            let userSaved = await prisma.user.create({data:{
                name: data.name,
                password: encryptedPassword,
                email: data.email
            }})
            return await new ResponseImplementation(userSaved, false)

        } catch (error) {
            return await new ResponseImplementation(error.message, true)
        }
    }
    async list(email){
        if(email != null){
            console.log("Caiu no caso do email")
            try {
                let res = await prisma.user.findUnique({where:{email:email}})
                return await new ResponseImplementation(res, false)
    
            } catch (error) {
                return await new ResponseImplementation(error.message, true)
            }
        }else{
            try {
                let result = await prisma.user.findMany()
                let response =new ResponseImplementation(result, false)
                return response
    
            } catch (error) {
                return await new ResponseImplementation(error.message, true)
            }
        }    
    }
    async delete(id){
        try {
            let result = await prisma.user.delete({where:{id:parseInt(id)}})
            let response = new ResponseImplementation(result, false)
            return response
        } catch (error) {
            return await new ResponseImplementation(error.message, true)
        }
    }
    async login(data:LoginUserDTO){
        try {
            let searchForThisUSer = await prisma.user.findUnique({where:{email:data.email}})
            if(searchForThisUSer){
                let senhaValida = await bcrypt.compare(data.password, searchForThisUSer.password)
                if(senhaValida && data.email == searchForThisUSer.email){
                    let token = jwt.sign(data, process.env.JWT_SECRET);
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