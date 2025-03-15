import { ClientePrimitive } from '@/src/Clientes/Domain/Interfaces/ClientePrimitive';
import { UsuarioPrimitive } from './UsuarioPrimitive';
import { EmpleadoPrimitive } from '@/src/Empleados/Domain/Interfaces/EmpleadoPrimitive';

export interface UsuarioWithRelations {
  usuario: UsuarioPrimitive;
  cliente: ClientePrimitive | null;
  empleado: EmpleadoPrimitive | null;
}
