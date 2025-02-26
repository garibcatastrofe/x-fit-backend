import { RespuestaPrimitive } from './RespuestaPrimitive';

export interface RespuestaQuery<T> {
  ultimoDoc: RespuestaPrimitive;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  direction: string;
}
