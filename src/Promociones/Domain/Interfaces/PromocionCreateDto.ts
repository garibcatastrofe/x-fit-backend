import { PromocionPrimitive } from './PromocionPrimitive';

export interface PromocionCreateDto extends Omit<PromocionPrimitive, 'id'> {
  id?: number;
}
