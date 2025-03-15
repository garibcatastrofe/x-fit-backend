import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { ClientePrimitive } from '../../Domain/Interfaces/ClientePrimitive';
import { ClienteRepository } from '../../Domain/Entities/ClienteRepository';
import { ClienteWithRelations } from '../../Domain/Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { UsuarioPrimitive } from '../../../Usuarios/Domain/Interfaces/UsuarioPrimitive';

export class GetAllCliente {
  public constructor(private readonly clienteRepository: ClienteRepository) {}

  public async run(
    query: IQuery<ClientePrimitive | UsuarioPrimitive>,
  ): Promise<PaginatedResponse<ClienteWithRelations>> {
    const clientes = await this.clienteRepository.getAll(query);
    return clientes;
  }
}
