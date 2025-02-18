import { PagoPrimitive } from './PagoPrimitive';

export interface PagoCreateDto extends Omit<PagoPrimitive, 'id'> {
  id?: number;
}
