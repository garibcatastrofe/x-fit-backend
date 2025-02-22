import { EjercicioPrimitive } from './EjercicioPrimitive';

export interface EjercicioCreateDto extends Omit<EjercicioPrimitive, 'id'> {
  id?: string;
}
