import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { PagoPrimitive } from '../Interfaces/PagoPrimitive';

export interface PagoRepository {
  create(pago: PagoPrimitive): Promise<void>;
  getAll(query: IQuery<PagoPrimitive>): Promise<PagoPrimitive[]>;
  getById(id: number): Promise<PagoPrimitive | null>;
  update(id: number, pago: PagoPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
