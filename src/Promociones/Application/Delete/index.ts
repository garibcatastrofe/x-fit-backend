import { PromocionRepository } from '../../Domain/Entities/PromocionRepository';

export class DeletePromocion {
  public constructor(private readonly promocionRepo: PromocionRepository) {}

  public async run(id: number): Promise<void> {
    await this.promocionRepo.getById(id);
    await this.promocionRepo.delete(id);
  }
}
