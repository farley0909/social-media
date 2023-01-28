
import { Router } from "express";
import { prisma } from "./database";
import { PostRepository } from "./repositories/implementations/PostRepository";
import { addUserController } from "./userCases/User/AddUser/index";
import { deleteUserController } from "./userCases/User/deleteUser";
import { listUsersController } from "./userCases/User/ListUsers";
import { loginUserControler } from "./userCases/User/LoginUser";
import { ResponseImplementation } from "./util/ResponseImplementation";

let router = Router()

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
        return res.render('home', {posts: result, users: userBasicInfo })
    } catch (error) {
        return res.status(400)
    }
    
})

export { router }