import Producto from "../domain/Producto";
import ProductoRepository from "../domain/producto.repository";

export default class ProductoUseCases implements ProductoRepository {
    
    productosRepository: ProductoRepository 
    
    constructor(productosRepository: ProductoRepository) {
        this.productosRepository = productosRepository
    }
    crear(producto: Producto): Promise<String> {
        return this.productosRepository.crear(producto)
    }
    getAll(): Promise<Producto[] | undefined> {
        return this.productosRepository.getAll()
    }
    comprar(usuario: Number, producto: Number): Promise<String | undefined> {
        return this.productosRepository.comprar(usuario, producto)
    }
}