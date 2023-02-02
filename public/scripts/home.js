
let token = localStorage.getItem('token')
console.log(token)

let userId
async function main(){
   let datauser =  await getUserInfo()
    userId = datauser.data.id
}
main()

function showUserInfo(response){
    let perfil = document.getElementById('perfil')
    perfil.innerHTML=''+response.data.name
    let userIdFoto = document.getElementById("idDoUsuario")
    userIdFoto.value=""+response.data.id
    let foto = document.getElementById('fotoPerfil')
    let autorPost = document.getElementById('autorPost').value=""+ response.data.id
    if(response.data.foto_perfil.length > 0){
        foto.setAttribute('src',"/uploads/"+response.data.foto_perfil)
    }
    document.getElementById('comentarioIdUsuario').value = response.data.id
    
}
async function getUserInfo(){
    try {
        let request = await fetch(`/api/user/list/${token}` )
        let response = await request.json()
        showUserInfo(response)
        return response

    } catch (error) {
        console.log(error.message)
    }
}
let postId

async function preencheFormComentarios(id, user, ){
    postId = id   
    try {
        let result = await fetch(`/api/comments/list/${postId}`)
        let res = await result.json()
        let container = document.getElementById('container-comentario')
        res.forEach(async el => {
            let nomeAutor = await getuserNameById(el.autor)
            console.log('nome', nomeAutor)
            let a = document.createElement('a')
            a.classList.add('list-group-item')
            a.classList.add('list-group-item-action')
            let p = document.createElement('p')
            p.classList.add('mb-1')
            let small = document.createElement('small')
            small.classList.add('text-muted')
            p.innerText=""+el.comentario
            small.innerHTML=""+nomeAutor
            a.appendChild(p)
            a.appendChild(small)
            container.appendChild(a)
        })
       
    } catch (error) {
        console.log(error.message)
    }
    
}
let btn = document.getElementById('btnEnviarComentario')
btn.addEventListener('click', async ()=>{
   
     let obj = {
         foto: postId,
         autor: userId,
         comentario: document.getElementById('iputComentario').value
     }
     console.log('dados a enviar: ', obj)
     let req = await fetch('/api/post/create/v2/', {
         method: 'post', 
             headers: {
                 'Content-Type':'application/json',
                 'authorization':token
             },
             body:JSON.stringify(obj)
         
     })
     let response = await req.json()
     console.log('resposta; ', response)  
     document.getElementById('btnCloseForum').click()

})
async function getuserNameById(id){
    
    let names = await fetch('/api/user/names/')
    let res = await names.json()
    let nome
    res.forEach(el => {
        if(el.id == id){
            nome = el.name
            return el.name
        }
    })
    return nome
}
let btnForumFechar = document.getElementById('btnCloseForum')
btnForumFechar.addEventListener('click', ()=>{
    let container = document.getElementById('container-comentario')
    container.innerHTML = "";
})
let btnForumFechar2 = document.getElementById('btnCloseForum2')
btnForumFechar2.addEventListener('click', ()=>{
    let container = document.getElementById('container-comentario')
    container.innerHTML = "";
})

async function paginaPerfil(id){
   location.href='/api/user/profile/'+id
}