import { UsuarioRepository } from '../../Domain/Entities/UsuarioRepository';
import { UsuarioPrimitive } from '../../Domain/Interfaces/UsuarioPrimitive';

export class UpdateUsuario {
  public constructor(private readonly usuarioRepo: UsuarioRepository) {}

  public async run(id: number, usuario: UsuarioPrimitive): Promise<void> {
    await this.usuarioRepo.getById(id);

    await this.usuarioRepo.update(id, usuario);
  }
}
