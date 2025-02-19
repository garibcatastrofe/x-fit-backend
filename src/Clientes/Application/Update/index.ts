import { Cliente } from '../../Domain/Entities/Cliente';
import { ClienteId } from '../../Domain/Entities/ClienteId';
import { ClienteFechaInicio } from '../../Domain/Entities/ClienteFechaInicio';
import { ClienteGenero } from '../../Domain/Entities/ClienteGenero';
import { ClienteTipo } from '../../Domain/Entities/ClienteTipo';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';

import { ClienteRepository } from '../../Domain/Entities/ClienteRepository';
import { UsuarioRepository } from '@/src/Usuarios/Domain/Entities/UsuarioRepository';
import { UpdateClienteDto } from '../../Domain/Interfaces/UpdateClienteDto';

import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class UpdateCliente {
  public constructor(
    private readonly clienteRepo: ClienteRepository,
    private readonly usuarioRepo: UsuarioRepository,
  ) {}

  public async run(id: number, { usuario_id }: UpdateClienteDto): Promise<void> {
    const clienteId = new ClienteId(id);

    const clienteViejo = await this.clienteRepo.getById(clienteId.value);

    if (usuario_id) await this.usuarioRepo.getById(usuario_id);

    if (!usuario_id) {
      throw new BadRequest({
        message: 'El usuario con ese id no existe',
        campo: 'usuario_id',
        data: usuario_id,
      });
    }

    const newCliente = new Cliente(
      new ClienteId(clienteId.value),
      new ClienteFechaInicio(
        new Date(
          clienteViejo?.fecha_inicio == undefined ? '' : clienteViejo.fecha_inicio,
        ).toDateString(),
      ),
      new ClienteTipo(clienteViejo == null ? 'NORMAL' : clienteViejo.tipo),
      new ClienteGenero(clienteViejo == null ? 'M' : clienteViejo.genero),
      new UsuarioId(usuario_id),
    );
    await this.clienteRepo.update(clienteId.value, newCliente.toPrimitive());
  }
}
