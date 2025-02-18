import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { MembresiaRepository } from '../../Domain/Entities/MembresiaRepository';
import { MembresiaPrimitive } from '../../Domain/Interfaces/MembresiaPrimitive';

export class GetAllMembresias {
  public constructor(private readonly membresiaRepo: MembresiaRepository) {}

  public async run(query: IQuery<MembresiaPrimitive>): Promise<MembresiaPrimitive[]> {
    const membresias = await this.membresiaRepo.getAll(query);

    return membresias;
  }
}
