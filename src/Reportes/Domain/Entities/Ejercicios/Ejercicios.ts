import { EjercicioReporte } from '../../Interfaces/ReportePrimitive';
import { EjercicioId } from '@/src/Ejercicios/Domain/Entities/EjercicioId';
import { Serie } from './Serie';

export class Ejercicios {
  public ejercicioId: EjercicioId;
  public series: Serie[];

  public constructor(ejercicio_id: EjercicioId, series: Serie[]) {
    this.ejercicioId = ejercicio_id;
    this.series = series;
  }

  public toPrimitive(): EjercicioReporte {
    return {
      id_ejercicio: this.ejercicioId.value,
      series: this.series.map(s => s.toPrimitive()),
    };
  }
}
