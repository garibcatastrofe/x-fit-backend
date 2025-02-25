import { RuffierPrimitive } from './RuffierPrimitive';

export interface RuffierQuery<T> {
  ultimoDoc: RuffierPrimitive;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  direction: string;
}
