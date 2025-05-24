import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { MembresiaPrimitive } from '../Interfaces/MembresiaPrimitive';
import { MembresiaWithRelations } from '../Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';

export interface MembresiaRepository {
  create(membresia: MembresiaPrimitive): Promise<void>;
  getAll(query: IQuery<MembresiaPrimitive>): Promise<PaginatedResponse<MembresiaWithRelations>>;
  getById(id: number): Promise<MembresiaPrimitive | null>;
  update(id: number, membresia: MembresiaPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
