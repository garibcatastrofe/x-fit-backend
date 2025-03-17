/* import { Cliente } from '../../Domain/Entities/Cliente'; */
import { ClienteId } from '../../Domain/Entities/ClienteId';
/* import { ClienteFechaInicio } from '../../Domain/Entities/ClienteFechaInicio';
import { ClienteTipo } from '../../Domain/Entities/ClienteTipo';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId'; */

import { ClienteRepository } from '../../Domain/Entities/ClienteRepository';
/* import { UpdateClienteDto } from '../../Domain/Interfaces/UpdateClienteDto'; */

/* import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest'; */
import { ClientePrimitive } from '../../Domain/Interfaces/ClientePrimitive';

export class UpdateCliente {
  public constructor(private readonly clienteRepo: ClienteRepository) {}

  public async run(id: number, cliente: ClientePrimitive): Promise<void> {
    const clienteId = new ClienteId(id);

    /* const clienteViejo = await this.clienteRepo.getById(clienteId.value); */

    /* if (usuario_id) await this.usuarioRepo.getById(usuario_id);

    if (!usuario_id) {
      throw new BadRequest({
        message: 'El usuario con ese id no existe',
        campo: 'usuario_id',
        data: usuario_id,
      });
    } */

    /* const newCliente = new Cliente(
      new ClienteId(clienteId.value),
      new ClienteFechaInicio(
        new Date(clienteViejo?.fecha_inicio ?? '').toISOString().split('T')[0],
      ),
      new ClienteTipo(clienteViejo == null ? 'NORMAL' : clienteViejo.tipo),
      new UsuarioId(usuario_id),
    ); */

    await this.clienteRepo.update(clienteId.value, cliente);
    /* await this.clienteRepo.update(clienteId.value, newCliente.toPrimitive()); */
  }
}
