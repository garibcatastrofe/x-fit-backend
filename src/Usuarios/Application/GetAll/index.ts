import { UsuarioRepository } from '../../Domain/Entities/UsuarioRepository';
import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { UsuarioPrimitive } from '../../Domain/Interfaces/UsuarioPrimitive';
import { UsuarioWithRelations } from '../../Domain/Interfaces/Responses';
import { PaginatedResponseUsuarios } from '@/src/Shared/Domain/Interfaces/Responses';

export class GetAllUsuarios {
  public constructor(private readonly usuarioRepo: UsuarioRepository) {}
  public async run(
    query: IQuery<UsuarioPrimitive>,
  ): Promise<PaginatedResponseUsuarios<UsuarioWithRelations>> {
    const usuarios = await this.usuarioRepo.getAll(query);
    return usuarios;
  }
}
