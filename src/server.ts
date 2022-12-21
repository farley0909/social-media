import { app } from "./app"

const port = 8080 || process.env.PORT

app.listen(port, ()=>console.log(`Server is running on port ${port}...`))
