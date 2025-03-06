import { ReporteQuery } from '../Interfaces/FirebaseQuery';
import { ReportePrimitive } from '../Interfaces/ReportePrimitive';

export interface ReporteRepository {
  create(reporte: ReportePrimitive): Promise<void>;
  getAll(query: ReporteQuery<ReportePrimitive>): Promise<ReportePrimitive[]>;
  getById(id: string): Promise<ReportePrimitive | null>;
  update(id: string, reporte: ReportePrimitive): Promise<void>;
  delete(id: string): Promise<void>;
}
