import {uuid} from 'uuidv4'
interface user {
    name:string
    password:string
    email:string
    id:string
}

export class userMock {
    users = []
    async create(data){
        data.id = await uuid()
        this.users.forEach(el =>{
            if(el.email == data.email){
                throw new Error('Email constraint failed')
            }
        })
        this.users.push(data)
        let result
         this.users.forEach(el => {
            if(el.email = data.email){
                result =  el
            }
        })
        return result
    }
    async findMany(){
        return this.users
    }
    findUnique(data):user{
        let user 
        let finded = 0
        this.users.forEach(el => {
            if(el.id == data.id) {
                user = el
                finded = 1
            }
        })
        if(finded == 0){
            this.users.forEach(el => {
                if(el.email == data.email) {
                    user = el
                    finded = 1
                }
            })
        }

        return user
    }
    delete(data){
        let exist = 0
        let user
        this.users.forEach(el => {
            if(el.id == data.id){
                user = el
                exist = 1
            }
        })
        if(exist == 0){
            throw new Error('invalid id')
        }
       let filtered = this.users.filter(user => user.id != data.id)
       this.users = filtered
       return user
    }
   

}