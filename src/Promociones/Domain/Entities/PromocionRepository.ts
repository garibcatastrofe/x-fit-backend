import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { PromocionPrimitive } from '../Interfaces/PromocionPrimitive';

export interface PromocionRepository {
  create(promocion: PromocionPrimitive): Promise<void>;
  getAll(query: IQuery<PromocionPrimitive>): Promise<PromocionPrimitive[]>;
  getById(id: number): Promise<PromocionPrimitive | null>;
  update(id: number, promocion: PromocionPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
