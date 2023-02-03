
import { Router } from "express";
import { resolve } from "path";
import { prisma } from "./database";
import { PostRepository } from "./repositories/implementations/PostRepository";
import { addUserController } from "./userCases/User/AddUser/index";
import { deleteUserController } from "./userCases/User/deleteUser";
import { listUsersController } from "./userCases/User/ListUsers";
import { loginUserControler } from "./userCases/User/LoginUser";
import { ResponseImplementation } from "./util/ResponseImplementation";
import jwt from 'jsonwebtoken'

let router = Router()
const verificaToken = (req, res, next)=>{
    try{
        let token = req.headers['authorization']
        if(token === undefined){
            return res.json(new ResponseImplementation('unauthorized', true))
        }else{
            next()
        }
    }catch(err){
        return res.json(new ResponseImplementation('unauthorized', true))
    }
}
router.get("/", async (req, res)=>{
  
    res.render("index")
})
router.post("/api/user/register/", async (request, response)=>{
   await addUserController.handle(request, response)
})
router.get("/api/user/list/:token", async (req, res)=>{
    await listUsersController.handle(req, res)
})
router.get("/api/user/basic-info/:id", async (req, res)=>{
    try {

        let result =  await prisma.user.findUnique({where:{id: parseInt(req.params.id)}})

        let contentToSend = {
            nome:result.name,
            email: result.email,
            foto_perfil: result.foto_perfil,
            id:result.id
        }
        return res.json(new ResponseImplementation(contentToSend, false))
    } catch (error) {
        return res.json(new ResponseImplementation(error.message, true))
    }
})
router.delete("/api/user/delete/", async (req, res)=>{
    await deleteUserController.handle(req, res)
})  
router.post("/api/user/login/", async (req, res)=>{
    await loginUserControler.handle(req, res)
})
router.get("/api/user/home/", async (req, res)=>{
    try {
        let result = await new PostRepository().list()
        let userBasicInfo = await prisma.user.findMany({})
        userBasicInfo.forEach(el => {el.password = null})
        let comments = await prisma.comentario.findMany({})
        return res.render('home', {posts: result, users: userBasicInfo, comments: comments })
    } catch (error) {
        return res.status(400)
    }
    
})
router.post('/api/post/create/v2/',verificaToken, async (req, res)=>{
    try {
        let result = await prisma.comentario.create({data:{
            data: new Date().toString(),
            autor: parseInt(req.body.autor),
            foto: parseInt(req.body.foto),
            comentario: req.body.comentario
        }})
        res.json(new ResponseImplementation(result, false))
    } catch (error) {
        res.json(new ResponseImplementation(error.message, false))
    }
})
router.get('/api/comments/list/:id', verificaToken, async (req, res)=>{
    try {
        let result = await prisma.comentario.findMany({
            where:{
               foto:parseInt(req.params.id)
            }
        })
        res.json(result)
    } catch (error) {
        res.json(error.message)
    }
})
router.get('/api/user/names/', verificaToken, async (req, res)=>{
  try {
    let result =  await prisma.user.findMany({ select: {
        name:true,
        id:true,
      }})
    res.json(result)
  } catch (error) {
    res.json({error: error.message})
  } 
})
router.post('/api/post/delete/', verificaToken, async (req, res)=>{
    let {id} = req.body
    let token = req.headers['authorization']
    try {
        let decode = await jwt.decode(token, process.env.JWT_SECRET)
        let postInfo = await prisma.foto.findUnique({where:{id:parseInt(id)}})
        let autorInfo = await prisma.user.findUnique({where:{email:decode.email}})
        
        if(postInfo.autor == autorInfo.id){
            let comments = await prisma.comentario.deleteMany({where:{foto:parseInt(id)}})
            let result = await prisma.foto.delete({where:{id:parseInt(id)}})
            return res.json( new ResponseImplementation(result, false))
        }else{
            return res.json( new ResponseImplementation('Você não é dono da postagem', true))
        }    
    } catch (error) {
        console.log(error)
        return res.json( new ResponseImplementation(error.message, true))
    }
})
router.get('/api/user/profile/:id', async (req, res)=>{
    try {
        let posts = await prisma.foto.findMany({where:{autor: parseInt(req.params.id)}})
        let autor = await prisma.user.findUnique({where:{id:parseInt(req.params.id)}}) 
        let comentarios = await prisma.comentario.findMany({where:{autor: parseInt(req.params.id)}})
        res.render('perfil', {posts:posts, autor: autor, comentarios: comentarios})
    } catch (error) {
       
    }
 
})



export { router }
