import { prisma } from "../../database";
import { AdduserDTO } from "../../userCases/User/AddUser/AddUserDTO";
import { ResponseImplementation } from "../../util/ResponseImplementation";
import { IUserRepository } from "../interface/IUserRepository";
import bcrypt from 'bcrypt'
import { LoginUserDTO } from "../../userCases/User/LoginUser/LoginUserDTO";
import jwt from 'jsonwebtoken'
import { uuid } from "uuidv4";
export class UserRepository implements IUserRepository {
    async save(data: AdduserDTO){
        try {     
            if(data.email.length <= 4) throw new Error('Invalid email')      
            let encryptedPassword = await bcrypt.hash(data.password, 12)
            let userSaved = await prisma.user.create({data:{
                id: await uuid(),
                name: data.name,
                password: encryptedPassword,
                email: data.email
            }})
            return await new ResponseImplementation(userSaved, false)

        } catch (error) {
            return await new ResponseImplementation(error.message, true)
        }
    }
    async list(token){
        try {
            let decode = await jwt.decode(token, process.env.JWT_SECRET)
            let userInfo = await prisma.user.findUnique({where:{email:decode.email}})

            return new ResponseImplementation(userInfo, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)
        }
       
    }
    async delete(id){
        try {
            let exist = await prisma.user.findUnique({where:{id:id}})
            if(!exist){
                throw new Error('invalid id')
            }
            let result = await prisma.user.delete({where:{id:id}})
            let response = new ResponseImplementation(result, false)
            return response
        } catch (error) {
            return await new ResponseImplementation(error.message, true)
        }
    }
    async login(data:LoginUserDTO){
        try {
            let searchForThisUSer = await prisma.user.findUnique({where:{email:data.email}})
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