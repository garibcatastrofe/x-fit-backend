import { MembresiaRepository } from '../../Domain/Entities/MembresiaRepository';
import { MembresiaPrimitive } from '../../Domain/Interfaces/MembresiaPrimitive';

export class UpdateMembresia {
  public constructor(private readonly membresiaRepo: MembresiaRepository) {}

  public async run(id: number, membresia: MembresiaPrimitive): Promise<void> {
    await this.membresiaRepo.getById(id);
    await this.membresiaRepo.update(id, membresia);
  }
}
