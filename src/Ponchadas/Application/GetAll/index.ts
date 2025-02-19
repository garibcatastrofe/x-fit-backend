import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { PonchadaRepository } from '../../Domain/Entities/PonchadaRepository';
import { PonchadaPrimitive } from '../../Domain/Interfaces/PonchadaPrimitive';

export class GetAllPonchadas {
  public constructor(private readonly ponchadaRepo: PonchadaRepository) {}

  public async run(query: IQuery<PonchadaPrimitive>): Promise<PonchadaPrimitive[]> {
    const ponchadas = await this.ponchadaRepo.getAll(query);

    return ponchadas;
  }
}
