import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import conn from "./src/db/conndb.js"
import router from "./src/router/pessoasRouter.js"
import trabalhoRouter from "./src/router/trabalhoRouter.js"
import empresaRouter from "./src/router/empresaRouter.js"
import produtoRouter from "./src/router/produtoRouter.js"

dotenv.config()

const { PORT } = process.env
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)
app.use('/api', trabalhoRouter)
app.use('/api', empresaRouter)
app.use('/api', produtoRouter)

conn
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na PORTA: ${PORT}`);
        })
    })
    .catch((error) => {
        console.error("Erro ao conectar ao BANCO: " + error)
    })