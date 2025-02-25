import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { RuffierId } from '../../Domain/Entities/RuffierId';
import { RuffierRepository } from '../../Domain/Entities/RuffierRepository';
import { RuffierPrimitive } from '../../Domain/Interfaces/RuffierPrimitive';

export class GetRuffierById {
  public constructor(private readonly ruffierRepository: RuffierRepository) {}

  public async run(id: string): Promise<RuffierPrimitive | null> {
    const idConvertido = new RuffierId(id);
    const ruffierEncontrado = await this.ruffierRepository.getById(idConvertido.value);

    if (!ruffierEncontrado) {
      throw new NotFoundException({
        message: `El ruffier con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return ruffierEncontrado ?? null;
  }
}
