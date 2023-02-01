
import { Router } from "express";
import { resolve } from "path";
import { prisma } from "./database";
import { PostRepository } from "./repositories/implementations/PostRepository";
import { addUserController } from "./userCases/User/AddUser/index";
import { deleteUserController } from "./userCases/User/deleteUser";
import { listUsersController } from "./userCases/User/ListUsers";
import { loginUserControler } from "./userCases/User/LoginUser";
import { ResponseImplementation } from "./util/ResponseImplementation";
import cors from 'cors'
let router = Router()

router.get("/", async (req, res)=>{
  
    res.render("index")
})
router.post("/api/user/register/",cors(), async (request, response)=>{
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
router.post('/api/post/create/v2/', async (req, res)=>{
    console.log(req.body)
    try {
        console.log('autor: ', req.body.autor)
        console.log('Post id: ', req.body.foto)
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
router.get('/api/comments/list/:id', async (req, res)=>{
    console.log('id: ', req.params.id)
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
router.get('/api/user/names/',async (req, res)=>{
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
