import { RutinaPrimitive } from './RutinaPrimitive';

export interface RutinaQuery<T> {
  ultimoDoc: RutinaPrimitive;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  direction: string;
}
