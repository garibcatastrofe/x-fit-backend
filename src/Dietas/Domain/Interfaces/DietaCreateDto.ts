import { DietaPrimitive } from './DietaPrimitive';

export interface DietaCreateDto extends Omit<DietaPrimitive, 'id'> {
  id?: string;
}
