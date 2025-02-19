import { CpmpPrimitive } from './CpmpPrimitive';

export interface CpmpCreateDto extends Omit<CpmpPrimitive, 'id'> {
  id?: number;
}
