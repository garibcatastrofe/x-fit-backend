import { MembresiaPrimitive } from './MembresiaPrimitive';

export interface MembresiaWithRelations {
  membresia: MembresiaPrimitive;
}

export interface PaginatedResponseMembresias<T> {
  data: T[];
  countMembresias: number;
}
