import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { UsuarioRepository } from '../../Domain/Entities/UsuarioRepository';
import { UsuarioPrimitive } from '../../Domain/Interfaces/UsuarioPrimitive';

export class GetAllUsuarios {
  public constructor(private readonly usuarioRepo: UsuarioRepository) {}

  public async run(query: IQuery<UsuarioPrimitive>): Promise<UsuarioPrimitive[]> {
    const usuarios = await this.usuarioRepo.getAll(query);

    return usuarios;
  }
}
