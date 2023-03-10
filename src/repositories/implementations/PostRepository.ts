import { uuid } from "uuidv4";
import { prisma } from "../../database";
import { AddPhotoDTO } from "../../userCases/Photo/AddPhoto/AddPhotoDTO";
import { ResponseImplementation } from "../../util/ResponseImplementation";


export class PostRepository {

    async save(data:AddPhotoDTO){
        try {
            let result = await prisma.foto.create({
                data:{
                    id: await uuid(),
                    data:""+Date.now(),
                    descricao: data.descricao,
                    imagem: data.imagem,
                    autor: data.autor,          
                }
            })
            return new ResponseImplementation(result, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)
        }
    }
    async list(){
        try {
            let result = await prisma.foto.findMany({})
            return new ResponseImplementation(result, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true) 
        }
    }
    async delete(id:string){
        try {
            let comments = await prisma.comentario.deleteMany({where:{foto:id}})
            let deleted = await prisma.foto.delete({where:{id:id}})  
            return new ResponseImplementation(deleted, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)
        }
    }
}