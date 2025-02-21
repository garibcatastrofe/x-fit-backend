import { Ponchada } from '../../Domain/Entities/Ponchada';
import { PonchadaId } from '../../Domain/Entities/PonchadaId';
import { PonchadaFecha } from '../../Domain/Entities/PonchadaFecha';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';

import { PonchadaRepository } from '../../Domain/Entities/PonchadaRepository';
import { UsuarioRepository } from '@/src/Usuarios/Domain/Entities/UsuarioRepository';
import { UpdatePonchadaDto } from '../../Domain/Interfaces/UpdatePonchadaDto';

import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class UpdatePonchada {
  public constructor(
    private readonly ponchadaRepo: PonchadaRepository,
    private readonly usuarioRepo: UsuarioRepository,
  ) {}

  public async run(id: number, { usuario_id }: UpdatePonchadaDto): Promise<void> {
    const ponchadaId = new PonchadaId(id);
    const ponchadaVieja = await this.ponchadaRepo.getById(ponchadaId.value);

    if (usuario_id) await this.usuarioRepo.getById(usuario_id);

    if (!usuario_id) {
      throw new BadRequest({
        message: 'El usuario con ese id no existe',
        campo: 'usuario_id',
        data: usuario_id,
      });
    }

    //console.log(ponchadaVieja?.fecha)

    const newPonchada = new Ponchada(
      new PonchadaId(ponchadaId.value),
      new PonchadaFecha(new Date(ponchadaVieja?.fecha == undefined ? "" : ponchadaVieja.fecha).toDateString()),
      new UsuarioId(usuario_id),
    );

    await this.ponchadaRepo.update(ponchadaId.value, newPonchada.toPrimitive());
  }
}
