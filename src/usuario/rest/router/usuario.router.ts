//Express:
import express, { Request, Response } from "express";
//Usecases:
import UsuarioUseCases from "../../application/usuario.usecases";
//Repository:
import UsuarioRepository from "../../domain/usuario.repository";
import UsuarioRepositoryPostgres from "../db/usuario.repository.postgres";
//Domain:
import Usuario from "../../domain/Usuario";
//Context:
import Auth from "../../domain/Auth";
import { createToken } from "../../../context/security/auth";
//Router:
const router = express.Router()
//Implementation:
const usuarioRepository: UsuarioRepository = new UsuarioRepositoryPostgres()
const usuarioUseCases: UsuarioUseCases = new UsuarioUseCases(usuarioRepository)
//Petitions:
router.post("/crear", async (req: Request, res: Response) => {
    try {
        const usuario: Usuario = {
            nombre: req.body.nombre,
            password: req.body.password
        }
        const result: Auth | String = await usuarioUseCases.create(usuario)
        res.json(result)
    } catch (error) {
        res.status(500).send(String(error))
    }
})

router.post("/login", async (req: Request, res: Response) => {
    try {
        const usuario: Usuario = {
            nombre: req.body.nombre,
            password: req.body.password
        }
        const loginOK = await usuarioUseCases.login(usuario)
        if (loginOK) {
            const token = createToken(loginOK)
            res.json(
                {
                    id: loginOK.id,
                    token: token
                }
            )
        }
    } catch (error) {
        res.status(404).send(`Usuario no registrado en la plataforma`)
    }
})

export { router as routerUsuario}