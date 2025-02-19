import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { PonchadaId } from '../../Domain/Entities/PonchadaId';
import { PonchadaRepository } from '../../Domain/Entities/PonchadaRepository';
import { PonchadaPrimitive } from '../../Domain/Interfaces/PonchadaPrimitive';

export class GetPonchadaById {
  public constructor(private readonly ponchadaRepository: PonchadaRepository) {}

  public async run(id: number): Promise<PonchadaPrimitive | null> {
    const idConvertido = new PonchadaId(id);
    const ponchadaEncontrada = await this.ponchadaRepository.getById(idConvertido.value);

    if (!ponchadaEncontrada) {
      throw new NotFoundException({
        message: `La ponchada con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return ponchadaEncontrada ?? null;
  }
}
