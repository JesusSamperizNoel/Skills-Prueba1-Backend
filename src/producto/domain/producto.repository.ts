import Producto from "./Producto";

export default interface ProductoRepository {
    crear(producto: Producto): Promise<String>
    getAll(): Promise<Producto[] | undefined>
    comprar(usuario: Number, producto: Number): Promise<String | undefined>
}