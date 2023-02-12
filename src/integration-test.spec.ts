import { after } from "node:test";
import { app } from "./app";
import request from 'supertest'
import { prisma } from "./database";
afterAll(async ()=>{
    await prisma.user.deleteMany({})
})
describe("Testando registro de usuário", ()=>{
    it("Cadastro usuário: Deve retornar uma responseImplementatio sem erro e um status 200", async () =>{
       let response = await request(app).post('/api/user/register/').send({
            name:"teste",
            password:"123",
            email:"teste123@gmail.com"
        })
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject({data:{name:"teste"},has_error:false})
    })
    it("Cadastro duplicado usuário: Deve retornar uma responseImplementatio com erro e um status 200", async () =>{
        let response = await request(app).post('/api/user/register/').send({
             name:"teste",
             password:"123",
             email:"teste123@gmail.com"
         })
         expect(response.status).toBe(200)
         expect(response.body).toMatchObject({has_error:true})
     })
     it("Tentando cadastrar sem passar um email: Deve retornar uma responseImplementatio com erro e um status 200", async () =>{
        let response = await request(app).post('/api/user/register/').send({
             name:"teste",
             password:"123",
             email:" "
         })
         expect(response.status).toBe(200)
         expect(response.body).toMatchObject({has_error:true})
     })
})

describe("Testando Login de usuário", ()=>{
    it("Login de usuário: Deve retornar uma responseImplementatio sem erro e um status 200", async () =>{
       let response = await request(app).post('/api/user/login/').send({
            name:"teste",
            password:"123",
            email:"teste123@gmail.com"
        })
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject({has_error:false})
    })
    it("Login com credenciais invalidas: Deve retornar uma responseImplementatio com erro e um status 200", async () =>{
        let response = await request(app).post('/api/user/login/').send({
             name:"teste",
             password:"senhaErrada",
             email:"teste123@gmail.com"
         })
         expect(response.status).toBe(200)
         expect(response.body).toMatchObject({has_error:true})
     })

})

