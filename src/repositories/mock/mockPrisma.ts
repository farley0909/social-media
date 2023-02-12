import { comentarioMock } from "./entities-mock/comentario";
import { postMock } from "./entities-mock/postMock";
import { userMock } from "./entities-mock/userMock";

export class mockPrisma {
    user:userMock
    foto:postMock
    comentario:comentarioMock
    constructor(){
        this.user = new userMock()
        this.foto = new postMock()
        this.comentario = new comentarioMock()
    }
}