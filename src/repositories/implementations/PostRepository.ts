import { prisma } from "../../database";
import { AddPhotoDTO } from "../../userCases/Photo/AddPhoto/AddPhotoDTO";
import { ResponseImplementation } from "../../util/ResponseImplementation";


export class PostRepository {

    async save(data:AddPhotoDTO){
        try {
            let result = await prisma.foto.create({
                data:{
                    data: "" + Date.now(),
                    descricao:""+ data.descricao,
                    imagem:""+ data.imagem,
                    autor: parseInt(data.autor),          
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
}