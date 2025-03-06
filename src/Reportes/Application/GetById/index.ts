import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { ReporteId } from '../../Domain/Entities/ReporteId';
import { ReporteRepository } from '../../Domain/Entities/ReporteRepository';
import { ReportePrimitive } from '../../Domain/Interfaces/ReportePrimitive';

export class GetReporteById {
  public constructor(private readonly reporteRepository: ReporteRepository) {}

  public async run(id: string): Promise<ReportePrimitive | null> {
    const idConvertido = new ReporteId(id);
    const reporteEncontrado = await this.reporteRepository.getById(idConvertido.value);

    if (!reporteEncontrado) {
      throw new NotFoundException({
        message: `La reporte con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return reporteEncontrado ?? null;
  }
}
