import { mockPrisma } from "./mockPrisma";
import { AddPhotoDTO } from "../../userCases/Photo/AddPhoto/AddPhotoDTO";
import { ResponseImplementation } from "../../util/ResponseImplementation";
import { IPostRepository } from "../interface/IPostRepository";
import { uuid } from "uuidv4";


export class postRepositoryMock implements IPostRepository {
    prisma = new mockPrisma()
    async save(data:AddPhotoDTO){
        try {
            let result = await this.prisma.foto.create({
                id: await uuid(),
                data: "" + Date.now(),
                descricao:""+ data.descricao,
                imagem:""+ data.imagem,
                autor: data.autor,          
            })
            return new ResponseImplementation(result, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)
        }
    }
    async list(){
        try {
            let result = await this.prisma.foto.findMany()
            return new ResponseImplementation(result, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true) 
        }
    }
    async delete(id:string){
        try {
            let comments = await this.prisma.comentario.deleteMany({foto:id})
            let deleted = await this.prisma.foto.delete({id:id})  
            return new ResponseImplementation(deleted, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)
        }
    }
}