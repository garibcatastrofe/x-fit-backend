import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { PromocionId } from '../../Domain/Entities/PromocionId';
import { PromocionRepository } from '../../Domain/Entities/PromocionRepository';
import { PromocionPrimitive } from '../../Domain/Interfaces/PromocionPrimitive';

export class GetPromocionById {
  public constructor(private readonly promocionRepository: PromocionRepository) {}

  public async run(id: number): Promise<PromocionPrimitive | null> {
    const idConvertido = new PromocionId(id);
    const promocionEncontrada = await this.promocionRepository.getById(idConvertido.value);

    if (!promocionEncontrada) {
      throw new NotFoundException({
        message: `La promoción con el id ${id} no fue encontrada`,
        campo: '/:id',
        data: id,
      });
    }

    return promocionEncontrada ?? null;
  }
}
