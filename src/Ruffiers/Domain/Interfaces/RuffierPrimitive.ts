export interface RuffierPrimitive {
  id?: string;
  id_cliente: number;
  id_rutina: string;
  bloque: string;
  fecha: Date;
  fc_previa: number;
  fc_terminar_esfuerzo: number;
  fc_minuto_terminar_esfuerzo: number;
}
