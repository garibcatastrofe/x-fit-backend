import { Ponchada } from '../../Domain/Entities/Ponchada';
import { PonchadaId } from '../../Domain/Entities/PonchadaId';
import { PonchadaFecha } from '../../Domain/Entities/PonchadaFecha';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';

import { PonchadaRepository } from '../../Domain/Entities/PonchadaRepository';
import { UsuarioRepository } from '@/src/Usuarios/Domain/Entities/UsuarioRepository';

import { PonchadaCreateDto } from '../../Domain/Interfaces/PonchadaCreateDto';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class CreatePonchada {
  public constructor(
    private readonly ponchadaRepo: PonchadaRepository,
    private readonly usuarioRepo: UsuarioRepository,
  ) {}

  public async run({ id, fecha, usuario_id }: PonchadaCreateDto): Promise<void> {
    const usuario = await this.usuarioRepo.getById(usuario_id);
    if (!usuario) {
      throw new BadRequest({
        message: 'El usuario para la ponchada no existe',
        campo: 'usuario_id',
        data: usuario_id,
      });
    }

    const newPonchada = new Ponchada(
      id ? new PonchadaId(id) : PonchadaId.random(),
      new PonchadaFecha(fecha),
      new UsuarioId(usuario_id),
    );
    await this.ponchadaRepo.create(newPonchada.toPrimitive());
  }
}
