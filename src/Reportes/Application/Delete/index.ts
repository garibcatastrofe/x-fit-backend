import { ReporteRepository } from '../../Domain/Entities/ReporteRepository';

export class DeleteReporte {
  public constructor(private readonly reporteRepo: ReporteRepository) {}

  public async run(id: string): Promise<void> {
    await this.reporteRepo.getById(id);
    await this.reporteRepo.delete(id);
  }
}
