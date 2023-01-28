
let token = localStorage.getItem('token')
console.log(token)


async function main(){
   let datauser =  await getUserInfo()
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
        foto.setAttribute('src',"http://localhost:8080/uploads/"+response.data.foto_perfil)
    }
    
}
async function getUserInfo(){
    try {
        let request = await fetch(`http://localhost:8080/api/user/list/${token}` )
        let response = await request.json()
        showUserInfo(response)
        

    } catch (error) {
        console.log(error.message)
    }
}
function getBasicUserInfo(id){
    console.log("asfsadf")
    document.getElementById('nomeAutor').innerHTML=""+id
}