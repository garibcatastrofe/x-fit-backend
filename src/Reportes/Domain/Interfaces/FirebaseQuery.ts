import { ReportePrimitive } from './ReportePrimitive';

export interface ReporteQuery<T> {
  ultimoDoc: ReportePrimitive;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  direction: string;
}
