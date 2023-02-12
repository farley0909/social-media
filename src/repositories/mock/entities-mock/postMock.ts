export class postMock {
    post = []

    
    create(data){
        this.post.push(data)
        let result 
        this.post.forEach(el => {
                if(el.autor == data.autor){
                    result = el
                }
        });
        return result
    }
    async findMany(){
        return this.post
    }
    delete(data){
        let exist = 0
        let post
        this.post.forEach(el => {
            if(el.id == data.id){
                post = el
                exist = 1
            }
        })
        if(exist == 0){
            throw new Error('invalid id')
        }
       let filtered = this.post.filter(el => el.id != data.id)
       this.post = filtered
       return post
    }
}