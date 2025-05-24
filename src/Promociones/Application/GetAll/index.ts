import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { PromocionRepository } from '../../Domain/Entities/PromocionRepository';
import { PromocionPrimitive } from '../../Domain/Interfaces/PromocionPrimitive';
import { PromocionWithRelations } from '../../Domain/Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';

export class GetAllPromociones {
  public constructor(private readonly promocionRepo: PromocionRepository) {}

  public async run(
    query: IQuery<PromocionPrimitive>,
  ): Promise<PaginatedResponse<PromocionWithRelations>> {
    const promociones = await this.promocionRepo.getAll(query);

    return promociones;
  }
}
