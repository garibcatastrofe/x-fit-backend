import { PagoRepository } from '../../Domain/Entities/PagoRepository';

export class DeletePago {
  public constructor(private readonly pagoRepo: PagoRepository) {}

  public async run(id: number): Promise<void> {
    await this.pagoRepo.getById(id);
    await this.pagoRepo.delete(id);
  }
}
