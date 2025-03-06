import { ReportePrimitive } from '../Interfaces/ReportePrimitive';
import { ReporteId } from './ReporteId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { RutinaId } from '@/src/Rutinas/Domain/Entities/RutinaId';
import { ReporteBloque } from './ReporteBloque';
import { ReporteSesion } from './ReporteSesion';
import { ReporteFecha } from './ReporteFecha';
import { Ejercicios } from './Ejercicios/Ejercicios';
import { BloqueType } from '../Interfaces/Bloque';
import { SesionType } from '../Interfaces/Sesion';

export class Reporte {
  public reporteId: ReporteId;
  public reporteClienteId: ClienteId;
  public reporteRutinaId: RutinaId;
  public reporteBloque: ReporteBloque;
  public reporteSesion: ReporteSesion;
  public reporteFecha: ReporteFecha;
  public reporteEjercicios: Ejercicios[];

  public constructor(
    id: ReporteId,
    cliente_id: ClienteId,
    rutina_id: RutinaId,
    bloque: ReporteBloque,
    sesion: ReporteSesion,
    fecha: ReporteFecha,
    ejercicios: Ejercicios[],
  ) {
    this.reporteId = id;
    this.reporteClienteId = cliente_id;
    this.reporteRutinaId = rutina_id;
    this.reporteBloque = bloque;
    this.reporteSesion = sesion;
    this.reporteFecha = fecha;
    this.reporteEjercicios = ejercicios;
  }

  public toReportePrimitive(): ReportePrimitive {
    return {
      id: this.reporteId.value,
      id_cliente: this.reporteClienteId.value,
      id_rutina: this.reporteRutinaId.value,
      bloque: this.reporteBloque.value as BloqueType,
      sesion: this.reporteSesion.value as SesionType,
      fecha: this.reporteFecha.value,
      ejercicios: this.reporteEjercicios.map(rep => rep.toPrimitive()),
    };
  }
}
