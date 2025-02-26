import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { RespuestaId } from '../../Domain/Entities/RespuestaId';
import { RespuestaRepository } from '../../Domain/Entities/RespuestaRepository';
import { RespuestaPrimitive } from '../../Domain/Interfaces/RespuestaPrimitive';

export class GetRespuestaById {
  public constructor(private readonly respuestaRepository: RespuestaRepository) {}

  public async run(id: string): Promise<RespuestaPrimitive | null> {
    const idConvertido = new RespuestaId(id);
    const respuestaEncontrada = await this.respuestaRepository.getById(idConvertido.value);

    if (!respuestaEncontrada) {
      throw new NotFoundException({
        message: `La respuesta con el id ${id} no fue encontrada`,
        campo: '/:id',
        data: id,
      });
    }

    return respuestaEncontrada ?? null;
  }
}
