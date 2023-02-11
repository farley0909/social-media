export class postMock {
    post = []
    save(data){
        this.post.push(data)
    }
}