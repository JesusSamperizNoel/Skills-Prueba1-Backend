import executeQuery from "../../../context/db/postgres.connector";
import Producto from "../../domain/Producto";
import ProductoRepository from "../../domain/producto.repository";



export default class ProductoRepositoryPostgres implements ProductoRepository {
    async crear(producto: Producto): Promise<String> {
        try {
            if (producto.descripcion) {
                await executeQuery(
                    `insert into productos(descripcion)
                    values('${producto.descripcion}')`
                )
            }
            return `Producto añadido al almacen de la tienda`
        } catch (error) {
            console.error(String(error));
            return `Ha ocurrido un problema en la aplicación`
        }
    }
    async getAll(): Promise<Producto[] | undefined> {
        try {
            const productos = await executeQuery(
                `select * 
                from productos`
            )
            return productos
        } catch (error) {
            console.error(String(error));
        }
    }
    async comprar(usuario: Number, producto: Number): Promise<String | undefined> {
        try {
            if (usuario && producto) {
                await executeQuery(
                    `insert into compras(usuario, producto)
                    values(${usuario}, ${producto})`
                )
            }
            return `Producto añadido al almacen de la tienda`
        } catch (error) {
            console.error(String(error));
            return `Ha ocurrido un error al realizar la compra`
        }
    }
}