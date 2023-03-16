import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
const port = process.env.PORT
app.use(express.json())
const allowedOrigins = ["*"]//Esto hay que modificarlo con la api cliente
const options: cors.CorsOptions = {
    origin: allowedOrigins
}
app.use(cors(options))

//Routers:
import { routerUsuario } from "./usuario/rest/router/usuario.router";
import { RouterProductos } from "./producto/rest/router/producto.router"
//Implementacion routers:
app.use("/usuario", routerUsuario)
app.use("/producto", RouterProductos)

//Port check configuration:
app.listen(process.env.PORT, () => {
    console.log(`Applicación lanzada por el puerto ${port}`);
    
})