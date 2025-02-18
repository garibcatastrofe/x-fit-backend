import { PromocionRepository } from '../../Domain/Entities/PromocionRepository';
import { PromocionPrimitive } from '../../Domain/Interfaces/PromocionPrimitive';

export class UpdatePromocion {
  public constructor(private readonly promocionRepo: PromocionRepository) {}

  public async run(id: number, promocion: PromocionPrimitive): Promise<void> {
    await this.promocionRepo.getById(id);
    await this.promocionRepo.update(id, promocion);
  }
}
