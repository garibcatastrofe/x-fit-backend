import { PromocionPrimitive } from '../Interfaces/PromocionPrimitive';
import { PromocionId } from './PromocionId';
import { PromocionNombre } from './PromocionNombre';
import { PromocionDescuento } from './PromocionDescuento';
import { PromocionTipoDescuento } from './PromocionTipoDescuento';
import { PromocionFechaInicio } from './PromocionFechaInicio';
import { PromocionFechaVencimiento } from './PromocionFechaVencimiento';
import { PromocionEstatus } from './PromocionEstatus';

export class Promocion {
  public promocionId: PromocionId;
  public promocionNombre: PromocionNombre;
  public promocionDescuento: PromocionDescuento;
  public promocionTipoDescuento: PromocionTipoDescuento;
  public promocionFechaInicio: PromocionFechaInicio;
  public promocionFechaVencimiento: PromocionFechaVencimiento;
  public promocionEstatus: PromocionEstatus;

  public constructor(
    id: PromocionId,
    nombre: PromocionNombre,
    descuento: PromocionDescuento,
    tipo_descuento: PromocionTipoDescuento,
    fecha_inicio: PromocionFechaInicio,
    fecha_vencimiento: PromocionFechaVencimiento,
    estatus: PromocionEstatus,
  ) {
    this.promocionId = id;
    this.promocionNombre = nombre;
    this.promocionDescuento = descuento;
    this.promocionTipoDescuento = tipo_descuento;
    this.promocionFechaInicio = fecha_inicio;
    this.promocionFechaVencimiento = fecha_vencimiento;
    this.promocionEstatus = estatus;
  }

  public toPromocionPrimitive(): PromocionPrimitive {
    return {
      id: this.promocionId.value,
      nombre: this.promocionNombre.value,
      descuento: this.promocionDescuento.value,
      tipo_descuento: this.promocionTipoDescuento.value,
      fecha_inicio: this.promocionFechaInicio.value,
      fecha_vencimiento: this.promocionFechaVencimiento.value,
      estatus: this.promocionEstatus.value,
    };
  }
}
