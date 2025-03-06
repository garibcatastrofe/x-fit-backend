import { ReporteQuery } from '../../Domain/Interfaces/FirebaseQuery';
import { ReporteRepository } from '../../Domain/Entities/ReporteRepository';
import { ReportePrimitive } from '../../Domain/Interfaces/ReportePrimitive';

export class GetAllReportes {
  public constructor(private readonly reporteRepo: ReporteRepository) {}

  public async run(query: ReporteQuery<ReportePrimitive>): Promise<ReportePrimitive[]> {
    const reportes = await this.reporteRepo.getAll(query);
    return reportes;
  }
}
