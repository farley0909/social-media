export class comentarioMock {
        comment = []
        async create(data){
                
                this.comment.push(data)
                let result 
                this.comment.forEach(el => {
                        if(el.autor == data.autor){
                            result = el
                        }
                });
                return result
        }
        async deleteMany(data){}
        delete(data){
                let exist = 0
                let comment
                this.comment.forEach(el => {
                    if(el.id == data.id){
                        comment = el
                        exist = 1
                    }
                })
                if(exist == 0){
                    throw new Error('invalid id')
                }
               let filtered = this.comment.filter(el => el.id != data.id)
               this.comment = filtered
               return comment
            }
        async findMany(){
                return this.comment
        }
        async update(data){
                let comment
                let finded = 0
                this.comment.forEach(el => {
                        if(el.id == data.id){
                         el.autor = data.autor
                         el.comentario = data.comentario
                         el.data = data.data
                         el.foto = data.foto
                         comment = el
                         finded = 1
                        }
                })
                if(finded <= 0){
                        throw new Error("invalid id")
                }else{
                        return comment  
                }
           
                
        }
}
//