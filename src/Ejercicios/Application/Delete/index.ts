import { EjercicioRepository } from '../../Domain/Entities/EjercicioRepository';

export class DeleteEjercicio {
  public constructor(private readonly ejercicioRepo: EjercicioRepository) {}

  public async run(id: string): Promise<void> {
    await this.ejercicioRepo.getById(id);
    await this.ejercicioRepo.delete(id);
  }
}
