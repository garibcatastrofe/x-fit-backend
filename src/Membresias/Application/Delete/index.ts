import { MembresiaRepository } from '../../Domain/Entities/MembresiaRepository';

export class DeleteMembresia {
  public constructor(private readonly membresiaRepo: MembresiaRepository) {}

  public async run(id: number): Promise<void> {
    await this.membresiaRepo.getById(id);
    await this.membresiaRepo.delete(id);
  }
}
