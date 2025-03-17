import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { PagoRepository } from '../../Domain/Entities/PagoRepository';
import { PagoPrimitive } from '../../Domain/Interfaces/PagoPrimitive';
import { PagoWithRelations } from '../../Domain/Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { ClientePrimitive } from '@/src/Clientes/Domain/Interfaces/ClientePrimitive';
import { MembresiaPrimitive } from '@/src/Membresias/Domain/Interfaces/MembresiaPrimitive';
import { PagoClientePrimitive } from '@/src/PagosClientes/Domain/Interfaces/PagoClientePrimitive';
import { PromocionPrimitive } from '@/src/Promociones/Domain/Interfaces/PromocionPrimitive';
import { UsuarioPrimitive } from '@/src/Usuarios/Domain/Interfaces/UsuarioPrimitive';

export class GetAllPagos {
  public constructor(private readonly pagoRepo: PagoRepository) {}

  public async run(
    query: IQuery<
      | PagoPrimitive
      | MembresiaPrimitive
      | PromocionPrimitive
      | PagoClientePrimitive
      | ClientePrimitive
      | UsuarioPrimitive
    >,
  ): Promise<PaginatedResponse<PagoWithRelations>> {
    const pagos = await this.pagoRepo.getAll(query);

    return pagos;
  }
}
