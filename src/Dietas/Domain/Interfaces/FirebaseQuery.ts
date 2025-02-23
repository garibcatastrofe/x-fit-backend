import { DietaPrimitive } from './DietaPrimitive';

export interface DietaQuery<T> {
  ultimoDoc: DietaPrimitive;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  direction: string;
}
