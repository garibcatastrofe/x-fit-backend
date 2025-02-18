import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { PagoId } from '../../Domain/Entities/PagoId';
import { PagoRepository } from '../../Domain/Entities/PagoRepository';
import { PagoPrimitive } from '../../Domain/Interfaces/PagoPrimitive';

export class GetPagoById {
  public constructor(private readonly pagoRepository: PagoRepository) {}

  public async run(id: number): Promise<PagoPrimitive | null> {
    const idConvertido = new PagoId(id);
    const pagoEncontrado = await this.pagoRepository.getById(idConvertido.value);

    if (!pagoEncontrado) {
      throw new NotFoundException({
        message: `El pago con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return pagoEncontrado ?? null;
  }
}
