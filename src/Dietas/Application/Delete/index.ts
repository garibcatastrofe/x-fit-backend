import { DietaRepository } from '../../Domain/Entities/DietaRepository';

export class DeleteDieta {
  public constructor(private readonly dietaRepo: DietaRepository) {}

  public async run(id: string): Promise<void> {
    await this.dietaRepo.getById(id);
    await this.dietaRepo.delete(id);
  }
}
