import { PromocionPrimitive } from './PromocionPrimitive';

export interface PromocionWithRelations {
  promocion: PromocionPrimitive;
}

export interface PaginatedResponsePromocions<T> {
  data: T[];
  countPromociones: number;
}
