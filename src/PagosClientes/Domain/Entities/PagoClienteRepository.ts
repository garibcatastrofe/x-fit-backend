import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { PagoClientePrimitive } from '../Interfaces/PagoClientePrimitive';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { PagoClienteWithRelations } from '../Interfaces/Responses';

export interface PagoClienteRepository {
  create(pago: PagoClientePrimitive): Promise<void>;
  getAll(query: IQuery<PagoClientePrimitive>): Promise<PaginatedResponse<PagoClienteWithRelations>>;
  getById(id: number): Promise<PagoClientePrimitive | null>;
  update(id: number, pago: PagoClientePrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
