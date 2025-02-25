import { MedicionRepository } from '../../Domain/Entities/MedicionRepository';

export class DeleteMedicion {
  public constructor(private readonly medicionRepo: MedicionRepository) {}

  public async run(id: string): Promise<void> {
    await this.medicionRepo.getById(id);
    await this.medicionRepo.delete(id);
  }
}
