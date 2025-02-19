import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { ClientePrimitive } from '../../Domain/Interfaces/ClientePrimitive';
import { ClienteRepository } from '../../Domain/Entities/ClienteRepository';

export class GetAllCliente {
  public constructor(private clienteRepository: ClienteRepository) {}

  public async run(query: IQuery<ClientePrimitive>): Promise<ClientePrimitive[]> {
    return await this.clienteRepository.getAll(query);
  }
}
