import { uuid } from "uuidv4";
import { prisma } from "../../database";
import { ResponseImplementation } from "../../util/ResponseImplementation";
import { CommentDTO } from "../../userCases/Comment/AddComment/DTO";

export class CommentRepository {
    async save(data){
        try {
            let result = await prisma.comentario.create({data:{
                autor:data.autor,
                comentario:data.comentario,
                data: data.data,
                foto: data.foto,
                id: await uuid()
            }})
            return new ResponseImplementation(result, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)
        }
    }
    async list(){
        try {
            let result = await prisma.comentario.findMany({})
            return new ResponseImplementation(result, false) 
        } catch (error) {
            return new ResponseImplementation(error.message, true) 
        }
    }
    async delete(id:string){
        try {
            let result = await prisma.comentario.delete({where:{id:id}})
            return new ResponseImplementation(result, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)  
        }
    }
    async update(data){
        try {
            let result = await prisma.comentario.update({where:{id:data.id}, 
            
            data:{
                ...data
            }})
            return new ResponseImplementation(result, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)
        }

    }
    

}