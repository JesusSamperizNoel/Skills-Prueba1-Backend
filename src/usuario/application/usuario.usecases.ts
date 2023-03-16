import Usuario from "../domain/Usuario";
import UsuarioRepository from "../domain/usuario.repository";

export default class UsuarioUseCases {

    usuarioRepository: UsuarioRepository

    constructor(usuarioRepository: UsuarioRepository) {
        this.usuarioRepository = usuarioRepository
    }

    create(usuario: Usuario): Promise<String> {
        return this.usuarioRepository.create(usuario)
    }

    login(usuario: Usuario): Promise<Usuario | undefined> {
        return this.usuarioRepository.login(usuario)
    }
}