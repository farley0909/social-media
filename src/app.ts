import express from 'express'
import { routes } from './routes'
import * as path from 'path';

const app =  express()
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', './public');
app.use(routes)
export { app }