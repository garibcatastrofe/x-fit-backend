import { IQuery } from '../../../Shared/Domain/Interfaces/QueryCompleteSearch';
import { PonchadaPrimitive } from '../Interfaces/PonchadaPrimitive';
import { PonchadaWithRelations } from '../Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';

export interface PonchadaRepository {
  create(ponchada: PonchadaPrimitive): Promise<number>;
  getAll(query: IQuery<PonchadaPrimitive>): Promise<PaginatedResponse<PonchadaWithRelations>>;
  getById(id: number): Promise<PonchadaPrimitive | null>;
  update(id: number, ponchada: PonchadaPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
