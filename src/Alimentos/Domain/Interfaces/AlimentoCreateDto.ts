import { AlimentoPrimitive } from './AlimentoPrimitive';

export interface AlimentoCreateDto extends Omit<AlimentoPrimitive, 'id'> {
  id?: string;
}
