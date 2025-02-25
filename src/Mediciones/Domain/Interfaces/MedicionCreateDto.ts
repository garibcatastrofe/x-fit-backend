import { MedicionPrimitive } from './MedicionPrimitive';

export interface MedicionCreateDto extends Omit<MedicionPrimitive, 'id'> {
  id?: string;
}
