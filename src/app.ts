import express from 'express'
import { router } from './routes'
import * as path from 'path';
import morgan from  'morgan'
const app =  express()
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', './public');   
app.use(router)

export { app }