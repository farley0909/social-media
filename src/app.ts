import express from 'express'
import { router } from './routes'
import * as path from 'path';
import morgan from  'morgan'
import multer from 'multer'
import {storage} from "./multerConfig"
import { prisma } from './database';
import { fileURLToPath } from 'url';
import { addPhotoController } from './userCases/Photo/AddPhoto';
import cors from 'cors'
const upload = multer({storage:storage})
const app =  express()
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', './public');   
app.use(router)
 app.use(cors());



app.post("/api/user/upload/profile-picture/", upload.single('file') ,async (req:any, res)=>{
    try {
      let user = await prisma.user.update({ where:{
            id:parseInt(req.body.id)
        }, data:{
            foto_perfil:req.file.filename
        }}) 
        res.redirect('/api/user/home/')
    } catch (error) {
        res.send(error.message)
    } 
})
app.post("/api/post/create/", upload.single('file'), async (req:any, res)=>{
   await  addPhotoController.handle(req, res)
})

export { app, upload }
