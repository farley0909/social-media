import { Router } from "express";
import { addUserController } from "./userCases/User/AddUser/index";
import { deleteUserController } from "./userCases/User/deleteUser";
import { listUsersController } from "./userCases/User/ListUsers";
import { loginUserControler } from "./userCases/User/LoginUser";

let router = Router()

router.get("/", (req, res)=>{
    res.render("index")
})
router.post("/api/user/register/", async (request, response)=>{
   await addUserController.handle(request, response)
})
router.get("/api/user/list/", async (req, res)=>{
    await listUsersController.handle(req, res)
})
router.delete("/api/user/delete/", async (req, res)=>{
    await deleteUserController.handle(req, res)
})  
router.post("/api/user/login/", async (req, res)=>{
    await loginUserControler.handle(req, res)
})
router.get("/api/user/home/", async (req, res)=>{
  
    return res.render('home')
})
export { router }