import { AlimentoRepository } from '../../Domain/Entities/AlimentoRepository';

export class DeleteAlimento {
  public constructor(private readonly alimentoRepo: AlimentoRepository) {}

  public async run(id: string): Promise<void> {
    await this.alimentoRepo.getById(id);
    await this.alimentoRepo.delete(id);
  }
}
