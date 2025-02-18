import { Empleado } from '../../Domain/Entities/Empleado';
import { EmpleadoId } from '../../Domain/Entities/EmpleadoId';
import { EmpleadoPuesto } from '../../Domain/Entities/EmpleadoPuesto';
import { EmpleadoIsAdmin } from '../../Domain/Entities/EmpleadoIsAdmin';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';

import { EmpleadoRepository } from '../../Domain/Entities/EmpleadoRepository';
import { UsuarioRepository } from '@/src/Usuarios/Domain/Entities/UsuarioRepository';

import { EmpleadoCreateDto } from '../../Domain/Interfaces/EmpleadoCreateDto';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class CreateEmpleado {
  public constructor(
    private readonly empleadoRepo: EmpleadoRepository,
    private readonly usuarioRepo: UsuarioRepository,
  ) {}

  public async run({ id, puesto, is_admin, usuario_id }: EmpleadoCreateDto): Promise<void> {
    const usuario = await this.usuarioRepo.getById(usuario_id);
    if (!usuario) {
      throw new BadRequest({
        message: 'El usuario no existe',
        campo: 'usuario_id',
        data: usuario_id,
      });
    }

    const newEmpleado = new Empleado(
      id ? new EmpleadoId(id) : EmpleadoId.random(),
      new EmpleadoPuesto(puesto),
      new EmpleadoIsAdmin(is_admin),
      new UsuarioId(usuario_id),
    );
    await this.empleadoRepo.create(newEmpleado.toPrimitive());
  }
}
