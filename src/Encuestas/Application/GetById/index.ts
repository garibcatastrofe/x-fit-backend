import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { EncuestaId } from '../../Domain/Entities/EncuestaId';
import { EncuestaRepository } from '../../Domain/Entities/EncuestaRepository';
import { EncuestaPrimitive } from '../../Domain/Interfaces/EncuestaPrimitive';

export class GetEncuestaById {
  public constructor(private readonly encuestaRepository: EncuestaRepository) {}

  public async run(id: string): Promise<EncuestaPrimitive | null> {
    const idConvertido = new EncuestaId(id);
    const encuestaEncontrada = await this.encuestaRepository.getById(idConvertido.value);

    if (!encuestaEncontrada) {
      throw new NotFoundException({
        message: `La encuesta con el id ${id} no fue encontrada`,
        campo: '/:id',
        data: id,
      });
    }

    return encuestaEncontrada ?? null;
  }
}
