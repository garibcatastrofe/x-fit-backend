import { EmpleadoPrimitive } from './EmpleadoPrimitive';

export type UpdateEmpleadoDto = Partial<Omit<EmpleadoPrimitive, 'id' | 'is_admin'>>;
