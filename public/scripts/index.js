
let token
let btnRegister = document.getElementById('btnRegister')
btnRegister.addEventListener('click', async ()=>{
    let nameInput = document.getElementById('inputNameRegister').value
    let emailInput = document.getElementById('inputEmailResgister').value
    let passwordInput =  document.getElementById('inputPasswordRegister').value
    if((nameInput.length <=0)||(emailInput.length <=0)||(passwordInput.length <=0) ){
        alert('some of the fields are empty')
    }else{
        let dataToSend = {
            name : document.getElementById('inputNameRegister').value,
            email: document.getElementById('inputEmailResgister').value,
            password:  document.getElementById('inputPasswordRegister').value,
        }
        console.log("Dados a serem enviados", dataToSend)
        try {
            let request = await fetch('http://localhost:8080/api/user/register/', {
            method:'POST',
            body:JSON.stringify(dataToSend),
            mode: 'no-cors',
            headers:{
                'Content-Type':'application/json'
            }
        })
        let response = await request.json()
        document.getElementById('btnCancelRegister').click()
        } catch (error) {
            console.log(error.message)
        }
       
    }
})
let btnSignIn = document.getElementById('signIn')
btnSignIn.addEventListener('click',  async (ev)=>{
    let email = document.getElementById('inputEmail').value
    let senha = document.getElementById('inputPassword').value
    if((email.length <=0) || senha.length <= 0 ){
        alert("some of the fields are empty")
    
    }else{
   
        let dataToSend = {
            email : email,
            password: senha
        }
        try {
            let request = await fetch('http://localhost:8080/api/user/login/', {
            method:'POST',
            body:JSON.stringify(dataToSend),
            headers:{
                'Content-Type':'application/json'
            }
        })
        let response = await request.json()
        if(response.has_error == true){
            alert('Houve um erro ao validar o usuário')
        
        }else{
            token = response.data
            localStorage.setItem('token', token);
            window.location = 'http://localhost:8080/api/user/home/';
        }
       
        } catch (error) {
            console.log(error.message)
        }
    }
})
