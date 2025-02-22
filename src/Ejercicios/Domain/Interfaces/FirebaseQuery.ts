import { EjercicioPrimitive } from './EjercicioPrimitive';

export interface EjercicioQuery<T> {
  ultimoDoc: EjercicioPrimitive;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  direction: string;
}
