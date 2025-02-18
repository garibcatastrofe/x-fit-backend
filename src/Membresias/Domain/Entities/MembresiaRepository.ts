import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { MembresiaPrimitive } from '../Interfaces/MembresiaPrimitive';

export interface MembresiaRepository {
  create(membresia: MembresiaPrimitive): Promise<void>;
  getAll(query: IQuery<MembresiaPrimitive>): Promise<MembresiaPrimitive[]>;
  getById(id: number): Promise<MembresiaPrimitive | null>;
  update(id: number, membresia: MembresiaPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
