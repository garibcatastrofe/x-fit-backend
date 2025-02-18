import { PagoRepository } from '../../Domain/Entities/PagoRepository';
import { PagoPrimitive } from '../../Domain/Interfaces/PagoPrimitive';

export class UpdatePago {
  public constructor(private readonly pagoRepo: PagoRepository) {}

  public async run(id: number, pago: PagoPrimitive): Promise<void> {
    await this.pagoRepo.getById(id);

    await this.pagoRepo.update(id, pago);
  }
}
