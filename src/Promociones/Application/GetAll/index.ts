import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { PromocionRepository } from '../../Domain/Entities/PromocionRepository';
import { PromocionPrimitive } from '../../Domain/Interfaces/PromocionPrimitive';

export class GetAllPromociones {
  public constructor(private readonly promocionRepo: PromocionRepository) {}

  public async run(query: IQuery<PromocionPrimitive>): Promise<PromocionPrimitive[]> {
    const promociones = await this.promocionRepo.getAll(query);

    return promociones;
  }
}
