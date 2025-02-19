import { UsuarioRepository } from '../../Domain/Entities/UsuarioRepository';

export class DeleteUsuario {
  public constructor(private readonly usuarioRepo: UsuarioRepository) {}
  public async run(id: number): Promise<void> {
    await this.usuarioRepo.getById(id);
    await this.usuarioRepo.delete(id);
  }
}
