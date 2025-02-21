import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { AlimentoId } from '../../Domain/Entities/AlimentoId';
import { AlimentoRepository } from '../../Domain/Entities/AlimentoRepository';
import { AlimentoPrimitive } from '../../Domain/Interfaces/AlimentoPrimitive';

export class GetAlimentoById {
  public constructor(private readonly alimentoRepository: AlimentoRepository) {}

  public async run(id: string): Promise<AlimentoPrimitive | null> {
    const idConvertido = new AlimentoId(id);
    const alimentoEncontrado = await this.alimentoRepository.getById(idConvertido.value);

    if (!alimentoEncontrado) {
      throw new NotFoundException({
        message: `El alimento con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return alimentoEncontrado ?? null;
  }
}
