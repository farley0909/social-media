import { uuid } from "uuidv4";

import { ResponseImplementation } from "../../util/ResponseImplementation";
import { mockPrisma } from "./mockPrisma";

export class CommentRepositoryMock {
    prisma = new mockPrisma()
    async save(data){
        try {
            let result = await this.prisma.comentario.create({
                autor:data.autor,
                comentario:data.comentario,
                data: data.data,
                foto: data.foto,
                id: await uuid()
            })
            return new ResponseImplementation(result, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)
        }
    }
    async list(){
        try {
            let result = await this.prisma.comentario.findMany()
            return new ResponseImplementation(result, false) 
        } catch (error) {
            return new ResponseImplementation(error.message, true) 
        }
    }
    async delete(id:string){
        try {
            let result = await this.prisma.comentario.delete({id:id})
            return new ResponseImplementation(result, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)  
        }
    }
    async update(data){
        try {
            let result = await this.prisma.comentario.update(data)
            return new ResponseImplementation(result, false)
        } catch (error) {
            return new ResponseImplementation(error.message, true)
        }

    }


}