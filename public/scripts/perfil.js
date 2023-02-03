let token = localStorage.getItem('token')
async function deletaPost(id){

    try {
        let data = {
            id:id
        }
      let req = await fetch('/api/post/delete/',{ 
        method:'POST',
        headers:{
        'authorization':token,
        'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    })  
        let res = await req.json()
        console.log(res)
    } catch (error) {
        console.log(error)
      alert('houve um erro ao apagar o post')  
    }
}