import { PromocionPrimitive } from '../Interfaces/PromocionPrimitive';
import { PromocionId } from './PromocionId';
import { PromocionNombre } from './PromocionNombre';
import { PromocionDescuento } from './PromocionDescuento';
import { PromocionTipoDescuento } from './PromocionTipoDescuento';
import { PromocionFechaInicio } from './PromocionFechaInicio';
import { PromocionFechaVencimiento } from './PromocionFechaVencimiento';
import { PromocionEstatus } from './PromocionEstatus';
import { EstatusType } from '@/src/Shared/Domain/Interfaces/Estatus';
import { PromocionDescripcion } from './PromocionDescripcion';

export class Promocion {
  public promocionId: PromocionId;
  public promocionNombre: PromocionNombre;
  public promocionDescuento: PromocionDescuento;
  public promocionTipoDescuento: PromocionTipoDescuento;
  public promocionFechaInicio: PromocionFechaInicio;
  public promocionFechaVencimiento: PromocionFechaVencimiento;
  public promocionEstatus: PromocionEstatus;
  public promocionDescripcion: PromocionDescripcion;

  public constructor(
    id: PromocionId,
    nombre: PromocionNombre,
    descuento: PromocionDescuento,
    tipo_descuento: PromocionTipoDescuento,
    fecha_inicio: PromocionFechaInicio,
    fecha_vencimiento: PromocionFechaVencimiento,
    estatus: PromocionEstatus,
    descripcion: PromocionDescripcion,
  ) {
    this.promocionId = id;
    this.promocionNombre = nombre;
    this.promocionDescuento = descuento;
    this.promocionTipoDescuento = tipo_descuento;
    this.promocionFechaInicio = fecha_inicio;
    this.promocionFechaVencimiento = fecha_vencimiento;
    this.promocionEstatus = estatus;
    this.promocionDescripcion = descripcion;
  }

  public toPromocionPrimitive(): PromocionPrimitive {
    return {
      id: this.promocionId.value,
      nombre: this.promocionNombre.value,
      descuento: this.promocionDescuento.value,
      tipo_descuento: this.promocionTipoDescuento.value,
      fecha_inicio: this.promocionFechaInicio.value,
      fecha_vencimiento: this.promocionFechaVencimiento.value,
      estatus: this.promocionEstatus.value as EstatusType,
      descripcion: this.promocionDescripcion.value,
    };
  }
}
