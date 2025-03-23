import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { PonchadaRepository } from '../../Domain/Entities/PonchadaRepository';
import { PonchadaPrimitive } from '../../Domain/Interfaces/PonchadaPrimitive';
import { PonchadaWithRelations } from '../../Domain/Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';

export class GetAllPonchadas {
  public constructor(private readonly ponchadaRepo: PonchadaRepository) {}

  public async run(
    query: IQuery<PonchadaPrimitive>,
  ): Promise<PaginatedResponse<PonchadaWithRelations>> {
    const ponchadas = await this.ponchadaRepo.getAll(query);
    return ponchadas;
  }
}
