import { EmpleadoPrimitive } from './EmpleadoPrimitive';
import { UsuarioPrimitive } from '@/src/Usuarios/Domain/Interfaces/UsuarioPrimitive';

export interface EmpleadoWithRelations {
  empleado: EmpleadoPrimitive;
  usuario: UsuarioPrimitive | null;
}
