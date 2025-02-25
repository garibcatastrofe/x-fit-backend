import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { RutinaId } from '../../Domain/Entities/RutinaId';
import { RutinaRepository } from '../../Domain/Entities/RutinaRepository';
import { RutinaPrimitive } from '../../Domain/Interfaces/RutinaPrimitive';

export class GetRutinaById {
  public constructor(private readonly rutinaRepository: RutinaRepository) {}

  public async run(id: string): Promise<RutinaPrimitive | null> {
    const idConvertido = new RutinaId(id);
    const rutinaEncontrada = await this.rutinaRepository.getById(idConvertido.value);

    if (!rutinaEncontrada) {
      throw new NotFoundException({
        message: `La rutina con el id ${id} no fue encontrada`,
        campo: '/:id',
        data: id,
      });
    }

    return rutinaEncontrada ?? null;
  }
}
