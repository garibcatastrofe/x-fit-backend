export interface PagoPrimitive {
  id?: number;
  monto: number;
  fecha_pago: string;
  fecha_vencimiento: string;
  membresia_id: number;
  cliente_id: number;
  promocion_id: number;
}
