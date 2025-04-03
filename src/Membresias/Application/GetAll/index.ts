import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { MembresiaRepository } from '../../Domain/Entities/MembresiaRepository';
import { MembresiaPrimitive } from '../../Domain/Interfaces/MembresiaPrimitive';
import { MembresiaWithRelations } from '../../Domain/Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';

export class GetAllMembresias {
  public constructor(private readonly membresiaRepo: MembresiaRepository) {}

  public async run(
    query: IQuery<MembresiaPrimitive>,
  ): Promise<PaginatedResponse<MembresiaWithRelations>> {
    const membresias = await this.membresiaRepo.getAll(query);

    return membresias;
  }
}
