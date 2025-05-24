import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { PromocionPrimitive } from '../Interfaces/PromocionPrimitive';
import { PromocionWithRelations } from '../Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';

export interface PromocionRepository {
  create(promocion: PromocionPrimitive): Promise<void>;
  getAll(query: IQuery<PromocionPrimitive>): Promise<PaginatedResponse<PromocionWithRelations>>;
  getById(id: number): Promise<PromocionPrimitive | null>;
  update(id: number, promocion: PromocionPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
