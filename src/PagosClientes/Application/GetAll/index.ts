import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { PagoClienteRepository } from '../../Domain/Entities/PagoClienteRepository';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { PagoClientePrimitive } from '../../Domain/Interfaces/PagoClientePrimitive';
import { PagoClienteWithRelations } from '../../Domain/Interfaces/Responses';

export class GetAllPagosCliente {
  public constructor(private readonly pagoClienteRepo: PagoClienteRepository) {}

  public async run(
    query: IQuery<PagoClientePrimitive>,
  ): Promise<PaginatedResponse<PagoClienteWithRelations>> {
    const pagosClientes = await this.pagoClienteRepo.getAll(query);

    return pagosClientes;
  }
}
