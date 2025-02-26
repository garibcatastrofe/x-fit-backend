import { EncuestaPrimitive } from './EncuestaPrimitive';

export interface EncuestaCreateDto extends Omit<EncuestaPrimitive, 'id'> {
  id?: string;
}
