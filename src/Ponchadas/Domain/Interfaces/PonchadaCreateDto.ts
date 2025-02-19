import { PonchadaPrimitive } from './PonchadaPrimitive';

export interface PonchadaCreateDto extends Omit<PonchadaPrimitive, 'id'> {
  id?: number;
}
