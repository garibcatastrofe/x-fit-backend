import { EmpleadoId } from '@/src/Empleados/Domain/Entities/EmpleadoId';
import { EmpleadoPuesto } from './EmpleadoPuesto';
import { EmpleadoIsAdmin } from './EmpleadoIsAdmin';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';
import { EmpleadoPrimitive } from '../Interfaces/EmpleadoPrimitive';
import { IsAdminType } from '../Interfaces/IsAdmin';

export class Empleado {
  public empleadoId: EmpleadoId;
  public empleadoPuesto: EmpleadoPuesto;
  public empleadoIsAdmin: EmpleadoIsAdmin;
  public empleadoUsuarioId: UsuarioId;
  public constructor(
    id: EmpleadoId,
    puesto: EmpleadoPuesto,
    isAdmin: EmpleadoIsAdmin,
    empleadoUsuarioId: UsuarioId,
  ) {
    this.empleadoId = id;
    this.empleadoPuesto = puesto;
    this.empleadoIsAdmin = isAdmin;
    this.empleadoUsuarioId = empleadoUsuarioId;
  }

  public toPrimitive(): EmpleadoPrimitive {
    return {
      id: this.empleadoId.value,
      puesto: this.empleadoPuesto.value,
      is_admin: this.empleadoIsAdmin.value as IsAdminType,
      usuario_id: this.empleadoUsuarioId.value,
    };
  }
}
