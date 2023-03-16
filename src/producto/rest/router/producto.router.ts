//Express:
import express, { Request, Response } from "express";
import ProductoUseCases from "../../application/producto.usecases";
import ProductoRepository from "../../domain/producto.repository";
import ProductoRepositoryPostgres from "../db/producto.repository.postgres";
import Producto from "../../domain/Producto";
import { isAuth } from "../../../context/security/auth";

//Router:
const router = express.Router()
//Implementation:
const productoRepository: ProductoRepository = new ProductoRepositoryPostgres()
const productoUseCases: ProductoUseCases = new ProductoUseCases(productoRepository)
//Petitions:
router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await productoUseCases.getAll()
        res.json(result)
    } catch (error) {
        res.status(500).send(String(error))
    }
})

router.post("/crear", isAuth, async (req: Request, res: Response) => {
    try {
        const producto: Producto = {
            descripcion: req.body.descripcion
        }
        const result = await productoUseCases.crear(producto)
        res.json(result)
    } catch (error) {
        res.status(500).send(String(error))
    }
})

router.post("/comprar", isAuth, async (req: Request, res: Response) => {
    try {
        const usuario = req.body.usuario
        const producto = req.body.producto
        const result = await productoUseCases.comprar(usuario, producto)
        res.json(result)
    } catch (error) {
        res.status(500).send(String(error))
    }
})

export { router as RouterProductos }