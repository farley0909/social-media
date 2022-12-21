import express from 'express'
import { routes } from './routes'

const app =  express()

app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', './public');
app.use(routes)
export { app }