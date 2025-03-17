import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { PagoClientePrimitive } from '../Interfaces/PagoClientePrimitive';

export interface PagoClienteRepository {
  create(pago: PagoClientePrimitive): Promise<void>;
  getAll(query: IQuery<PagoClientePrimitive>): Promise<PagoClientePrimitive[]>;
  getById(id: number): Promise<PagoClientePrimitive | null>;
  update(id: number, pago: PagoClientePrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
