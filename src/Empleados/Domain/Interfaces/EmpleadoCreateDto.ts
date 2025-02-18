import { EmpleadoPrimitive } from './EmpleadoPrimitive';

export interface EmpleadoCreateDto extends Omit<EmpleadoPrimitive, 'id'> {
  id?: number;
}
