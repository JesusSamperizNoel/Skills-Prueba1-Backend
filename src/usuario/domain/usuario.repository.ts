import Usuario from "./Usuario";

export default interface UsuarioRepository {
    create(usuario: Usuario): Promise<String>
    login(usuario: Usuario): Promise<Usuario | undefined>
}