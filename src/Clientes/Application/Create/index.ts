import { Cliente } from '../../Domain/Entities/Cliente';
import { ClienteId } from '../../Domain/Entities/ClienteId';
import { ClienteFechaInicio } from '../../Domain/Entities/ClienteFechaInicio';
import { ClienteTipo } from '../../Domain/Entities/ClienteTipo';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';

import { ClienteRepository } from '../../Domain/Entities/ClienteRepository';
import { UsuarioRepository } from '@/src/Usuarios/Domain/Entities/UsuarioRepository';

import { ClienteCreateDto } from '../../Domain/Interfaces/ClienteCreateDto';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class CreateCliente {
  public constructor(
    private readonly clienteRepo: ClienteRepository,
    private readonly usuarioRepo: UsuarioRepository,
  ) {}

  public async run({ id, fecha_inicio, tipo, usuario_id }: ClienteCreateDto): Promise<void> {
    const usuario = await this.usuarioRepo.getById(usuario_id);
    if (!usuario) {
      throw new BadRequest({
        message: 'El usuario no existe',
        campo: 'usuario_id',
        data: usuario_id,
      });
    }

    const newCliente = new Cliente(
      id ? new ClienteId(id) : ClienteId.random(),
      new ClienteFechaInicio(fecha_inicio),
      new ClienteTipo(tipo),
      new UsuarioId(usuario_id),
    );
    await this.clienteRepo.create(newCliente.toPrimitive());
  }
}
