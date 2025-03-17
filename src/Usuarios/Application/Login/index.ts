import { UsuarioRepository } from '../../Domain/Entities/UsuarioRepository';
import { UsuarioCorreo } from '../../Domain/Entities/UsuarioCorreo'
import { UsuarioPassword } from '../../Domain/Entities/UsuarioPassword'
import { UsuarioPrimitive } from '../../Domain/Interfaces/UsuarioPrimitive'

export class Login {
  public constructor(private readonly usuarioRepository: UsuarioRepository) {}

  public async run(correo: string, password: string, isWeb: string): Promise<UsuarioPrimitive[]> {
    const corr = new UsuarioCorreo(correo)
    const pass = new UsuarioPassword(password)

    const usuarios = await this.usuarioRepository.login(corr.value, pass.value, isWeb);

    return usuarios
  }
}
