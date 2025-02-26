import { EncuestaRepository } from '../../Domain/Entities/EncuestaRepository';

export class DeleteEncuesta {
  public constructor(private readonly encuestaRepo: EncuestaRepository) {}

  public async run(id: string): Promise<void> {
    await this.encuestaRepo.getById(id);
    await this.encuestaRepo.delete(id);
  }
}
