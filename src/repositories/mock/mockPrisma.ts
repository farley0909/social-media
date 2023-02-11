import { postMock } from "./entities-mock/postMock";
import { userMock } from "./entities-mock/userMock";

export class mockPrisma {
    user:userMock
    post:postMock
    constructor(){
        this.user = new userMock
        this.post = new postMock
    }
}