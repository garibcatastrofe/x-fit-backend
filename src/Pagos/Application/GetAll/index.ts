//import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearchWhereCondition';
import { IQuery } from '../../Domain/Interfaces/Query';
import { PagoRepository } from '../../Domain/Entities/PagoRepository';
import { PagoWithRelations } from '../../Domain/Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { PagoPrimitive } from '../../Domain/Interfaces/PagoPrimitive';
/* import { ClientePrimitive } from '@/src/Clientes/Domain/Interfaces/ClientePrimitive';
import { MembresiaPrimitive } from '@/src/Membresias/Domain/Interfaces/MembresiaPrimitive';
import { PagoClientePrimitive } from '@/src/PagosClientes/Domain/Interfaces/PagoClientePrimitive';
import { PromocionPrimitive } from '@/src/Promociones/Domain/Interfaces/PromocionPrimitive';
import { UsuarioPrimitive } from '@/src/Usuarios/Domain/Interfaces/UsuarioPrimitive';
import { WhereConditionPrimitive } from '@/src/Shared/Domain/Interfaces/WhereConditionPrimitive'; */

export class GetAllPagos {
  public constructor(private readonly pagoRepo: PagoRepository) {}

  public async run(
    query: IQuery<PagoPrimitive> /* <
      | PagoPrimitive
      | MembresiaPrimitive
      | PromocionPrimitive
      | PagoClientePrimitive
      | ClientePrimitive
      | UsuarioPrimitive
      | WhereConditionPrimitive
    > */,
  ): Promise<PaginatedResponse<PagoWithRelations>> {
    const pagos = await this.pagoRepo.getAll(query);

    return pagos;
  }
}
