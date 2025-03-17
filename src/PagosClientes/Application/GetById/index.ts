import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { PagoClienteId } from '../../Domain/Entities/PagoClienteId';
import { PagoClienteRepository } from '../../Domain/Entities/PagoClienteRepository';
import { PagoClientePrimitive } from '../../Domain/Interfaces/PagoClientePrimitive';

export class GetPagoClienteById {
  public constructor(private readonly pagoClienteRepository: PagoClienteRepository) {}

  public async run(id: number): Promise<PagoClientePrimitive | null> {
    const idConvertido = new PagoClienteId(id);
    const pagoClienteEncontrado = await this.pagoClienteRepository.getById(idConvertido.value);

    if (!pagoClienteEncontrado) {
      throw new NotFoundException({
        message: `El pago-cliente con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return pagoClienteEncontrado ?? null;
  }
}
