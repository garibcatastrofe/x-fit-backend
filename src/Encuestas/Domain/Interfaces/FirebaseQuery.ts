import { EncuestaPrimitive } from './EncuestaPrimitive';

export interface EncuestaQuery<T> {
  ultimoDoc: EncuestaPrimitive;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  direction: string;
}
