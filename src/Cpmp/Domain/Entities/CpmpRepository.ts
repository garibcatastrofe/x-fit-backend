import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { CpmpPrimitive } from '../Interfaces/CpmpPrimitive';

export interface CpmpRepository {
  create(cpmp: CpmpPrimitive): Promise<void>;
  getAll(query: IQuery<CpmpPrimitive>): Promise<CpmpPrimitive[]>;
  getById(id: number): Promise<CpmpPrimitive | null>;
  update(id: number, cpmp: CpmpPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
