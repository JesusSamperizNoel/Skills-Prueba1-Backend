//Entidades de la aplicación:
import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/usuario.repository";
//Security:
import { compare, hash } from "../../../context/security/encrypter";
//SQL query:  
import executeQuery from "../../../context/db/postgres.connector";

export default class UsuarioRepositoryPostgres implements UsuarioRepository {
    async create(usuario: Usuario): Promise<String> {
        try {
            if (usuario.nombre && usuario.password) {
                await executeQuery(
                    `insert into usuarios(nombre, password)
                    values ('${usuario.nombre}','${usuario.password}')`
                )
                return `Usuario registrado correctamente en la plataforma`
            } else {
                return `Datos de usuario mal proporcionados`
            }
        } catch (error) {
            console.error(error);
            return `Error en la aplicacion`
        }
    }
    async login(usuario: Usuario): Promise<Usuario | undefined> {
        try {
            if (usuario.nombre && usuario.password) {
                const result: any[] = await executeQuery(`
                select *
                from usuarios
                where nombre = '${usuario.nombre}'
                `)
                const userFromDB = result[0]
                if (userFromDB && (usuario.password === userFromDB.password)) {
                    const userOK : Usuario = {
                        id: userFromDB.id,
                        nombre: userFromDB.nombre,
                        password: userFromDB.password
                    }
                    return userOK
                }
            }
        } catch (error) {
            return undefined
        }
    }
}