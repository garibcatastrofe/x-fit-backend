export interface PromocionPrimitive {
  id?: number;
  nombre: string;
  descuento: number;
  tipo_descuento: string;
  fecha_inicio: Date;
  fecha_vencimiento: Date;
  estatus: string;
}
