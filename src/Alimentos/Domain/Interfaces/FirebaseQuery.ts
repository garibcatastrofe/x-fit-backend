import { AlimentoPrimitive } from './AlimentoPrimitive';
//import { Alimento } from '../Entities/Alimento'

export interface AlimentoQuery<T> {
  ultimoDoc: AlimentoPrimitive;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  direction: string;
}
