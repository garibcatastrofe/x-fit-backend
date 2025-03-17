/* import { Empleado } from '../../Domain/Entities/Empleado'; */
import { EmpleadoId } from '../../Domain/Entities/EmpleadoId';
/* import { EmpleadoPuesto } from '../../Domain/Entities/EmpleadoPuesto';
import { EmpleadoIsAdmin } from '../../Domain/Entities/EmpleadoIsAdmin';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId'; */

import { EmpleadoRepository } from '../../Domain/Entities/EmpleadoRepository';
/* import { UsuarioRepository } from '@/src/Usuarios/Domain/Entities/UsuarioRepository';
import { UpdateEmpleadoDto } from '../../Domain/Interfaces/UpdateEmpleadoDto';

import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest'; */
import { EmpleadoPrimitive } from '../../Domain/Interfaces/EmpleadoPrimitive';

export class UpdateEmpleado {
  public constructor(
    private readonly empleadoRepo: EmpleadoRepository,
  ) {}

  public async run(id: number, empleado: EmpleadoPrimitive): Promise<void> {
    const empleadoId = new EmpleadoId(id);

    /* const empleadoViejo = await this.empleadoRepo.getById(empleadoId.value);

    if (usuario_id) await this.usuarioRepo.getById(usuario_id);

    if (!usuario_id) {
      throw new BadRequest({
        message: 'El usuario con ese id no existe',
        campo: 'usuario_id',
        data: usuario_id,
      });
    }

    const newEmpleado = new Empleado(
      new EmpleadoId(empleadoId.value),
      new EmpleadoPuesto(empleadoViejo == null ? 'Sin puesto' : empleadoViejo.puesto),
      new EmpleadoIsAdmin(empleadoViejo == null ? 'NO' : empleadoViejo.is_admin),
      new UsuarioId(usuario_id),
    ); */

    await this.empleadoRepo.update(empleadoId.value, empleado);
  }
}
