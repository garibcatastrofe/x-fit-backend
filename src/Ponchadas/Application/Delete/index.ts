import { PonchadaRepository } from '../../Domain/Entities/PonchadaRepository';

export class DeletePonchada {
  public constructor(private readonly ponchadaRepo: PonchadaRepository) {}
  public async run(id: number): Promise<void> {
    await this.ponchadaRepo.getById(id);
    await this.ponchadaRepo.delete(id);
  }
}
