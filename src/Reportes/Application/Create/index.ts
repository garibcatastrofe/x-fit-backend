import { Reporte } from '../../Domain/Entities/Reporte';
import { ReporteId } from '../../Domain/Entities/ReporteId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { RutinaId } from '@/src/Rutinas/Domain/Entities/RutinaId';
import { ReporteBloque } from '../../Domain/Entities/ReporteBloque';
import { ReporteSesion } from '../../Domain/Entities/ReporteSesion';
import { ReporteFecha } from '../../Domain/Entities/ReporteFecha';
import { Ejercicios } from '../../Domain/Entities/Ejercicios/Ejercicios';
import { ReporteRepository } from '../../Domain/Entities/ReporteRepository';
import { ReporteCreateDto } from '../../Domain/Interfaces/ReporteCreateDto';
import { EjercicioCarga } from '../../Domain/Entities/Ejercicios/EjercicioCarga';
import { EjercicioRepeticiones } from '../../Domain/Entities/Ejercicios/EjercicioRepeticiones';
import { EjercicioId } from '@/src/Ejercicios/Domain/Entities/EjercicioId';
import { Serie } from '../../Domain/Entities/Ejercicios/Serie';

export class CreateReporte {
  public constructor(private readonly reporteRepo: ReporteRepository) {}

  public async run({
    id,
    id_cliente,
    id_rutina,
    bloque,
    sesion,
    fecha,
    ejercicios,
  }: ReporteCreateDto): Promise<void> {
    const nuevoReporte = new Reporte(
      id ? new ReporteId(id) : ReporteId.retornoVacio(),
      new ClienteId(id_cliente),
      new RutinaId(id_rutina),
      new ReporteBloque(bloque),
      new ReporteSesion(sesion),
      new ReporteFecha(fecha),
      ejercicios.map(
        ejer =>
          new Ejercicios(
            new EjercicioId(ejer.id_ejercicio),
            ejer.series.map(
              exer =>
                new Serie(
                  new EjercicioCarga(exer.carga),
                  new EjercicioRepeticiones(exer.repeticiones),
                ),
            ),
          ),
      ),
    );

    await this.reporteRepo.create(nuevoReporte.toReportePrimitive());
  }
}
