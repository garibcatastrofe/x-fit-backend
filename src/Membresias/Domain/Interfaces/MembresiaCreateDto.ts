import { MembresiaPrimitive } from './MembresiaPrimitive';

export interface MembresiaCreateDto extends Omit<MembresiaPrimitive, 'id'> {
  id?: number;
}
