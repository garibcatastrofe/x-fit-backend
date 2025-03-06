import { ReportePrimitive } from './ReportePrimitive';

export interface ReporteCreateDto extends Omit<ReportePrimitive, 'id'> {
  id?: string;
}
