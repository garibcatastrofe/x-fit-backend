import { MedicionPrimitive } from './MedicionPrimitive';

export interface MedicionQuery<T> {
  ultimoDoc: MedicionPrimitive;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  direction: string;
}
