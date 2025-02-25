import { RutinaRepository } from '../../Domain/Entities/RutinaRepository';

export class DeleteRutina {
  public constructor(private readonly rutinaRepo: RutinaRepository) {}

  public async run(id: string): Promise<void> {
    await this.rutinaRepo.getById(id);
    await this.rutinaRepo.delete(id);
  }
}
