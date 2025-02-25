import { RuffierQuery } from '../../Domain/Interfaces/FirebaseQuery';
import { RuffierRepository } from '../../Domain/Entities/RuffierRepository';
import { RuffierPrimitive } from '../../Domain/Interfaces/RuffierPrimitive';

export class GetAllRuffiers {
  public constructor(private readonly ruffierRepo: RuffierRepository) {}

  public async run(query: RuffierQuery<RuffierPrimitive>): Promise<RuffierPrimitive[]> {
    const ruffiers = await this.ruffierRepo.getAll(query);
    return ruffiers;
  }
}
