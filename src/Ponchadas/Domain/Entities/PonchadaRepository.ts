import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { PonchadaPrimitive } from '../Interfaces/PonchadaPrimitive';

export interface PonchadaRepository {
  create(ponchada: PonchadaPrimitive): Promise<void>;
  getAll(query: IQuery<PonchadaPrimitive>): Promise<PonchadaPrimitive[]>;
  getById(id: number): Promise<PonchadaPrimitive | null>;
  update(id: number, ponchada: PonchadaPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
