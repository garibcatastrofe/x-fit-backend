import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { PagoPrimitive } from '../Interfaces/PagoPrimitive';
import { PagoWithRelations } from '../Interfaces/Responses';
import { MembresiaPrimitive } from '@/src/Membresias/Domain/Interfaces/MembresiaPrimitive';
import { PromocionPrimitive } from '@/src/Promociones/Domain/Interfaces/PromocionPrimitive';
import { PagoClientePrimitive } from '@/src/PagosClientes/Domain/Interfaces/PagoClientePrimitive';
import { ClientePrimitive } from '@/src/Clientes/Domain/Interfaces/ClientePrimitive';
import { UsuarioPrimitive } from '@/src/Usuarios/Domain/Interfaces/UsuarioPrimitive';

export interface PagoRepository {
  create(pago: PagoPrimitive): Promise<void>;
  getAll(
    query: IQuery<
      | PagoPrimitive
      | MembresiaPrimitive
      | PromocionPrimitive
      | PagoClientePrimitive
      | ClientePrimitive
      | UsuarioPrimitive
    >,
  ): Promise<PaginatedResponse<PagoWithRelations>>;
  getById(id: number): Promise<PagoPrimitive | null>;
  update(id: number, pago: PagoPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
