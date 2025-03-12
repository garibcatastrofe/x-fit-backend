import { UsuarioRepository } from '../../Domain/Entities/UsuarioRepository';
import { UsuarioCorreo } from '../../Domain/Entities/UsuarioCorreo'
import { UsuarioPassword } from '../../Domain/Entities/UsuarioPassword'
import { UsuarioPrimitive } from '../../Domain/Interfaces/UsuarioPrimitive'

export class Login {
  public constructor(private readonly usuarioRepository: UsuarioRepository) {}

  public async run(correo: string, password: string): Promise<UsuarioPrimitive[]> {
    const corr = new UsuarioCorreo(correo)
    const pass = new UsuarioPassword(password)

    console.warn(corr.value)
    console.warn(pass.value)

    console.warn(correo)
    console.warn(password)

    const usuarios = await this.usuarioRepository.login(corr.value, pass.value);

    return usuarios
  }
}
