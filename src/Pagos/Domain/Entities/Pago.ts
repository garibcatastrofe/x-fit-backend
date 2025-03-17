import { PagoPrimitive } from '../Interfaces/PagoPrimitive';
import { PagoId } from './PagoId';
import { PagoMonto } from './PagoMonto';
import { PagoFecha } from './PagoFecha';
import { PagoVencimiento } from './PagoVencimiento';
import { MembresiaId } from '@/src/Membresias/Domain/Entities/MembresiaId';
import { PromocionId } from '@/src/Promociones/Domain/Entities/PromocionId';

export class Pago {
  public pagoId: PagoId;
  public pagoMonto: PagoMonto;
  public pagoFecha: PagoFecha;
  public pagoVencimiento: PagoVencimiento;
  public pagoMembresiaId: MembresiaId;
  public pagoPromocionId: PromocionId;

  public constructor(
    id: PagoId,
    monto: PagoMonto,
    fecha: PagoFecha,
    vencimiento: PagoVencimiento,
    pagoMembresiaId: MembresiaId,
    pagoPromocionId: PromocionId,
  ) {
    this.pagoId = id;
    this.pagoMonto = monto;
    this.pagoFecha = fecha;
    this.pagoVencimiento = vencimiento;
    this.pagoMembresiaId = pagoMembresiaId;
    this.pagoPromocionId = pagoPromocionId;
  }

  public toPagoPrimitive(): PagoPrimitive {
    return {
      id: this.pagoId.value,
      monto: this.pagoMonto.value,
      fecha_pago: this.pagoFecha.value,
      fecha_vencimiento: this.pagoVencimiento.value,
      membresia_id: this.pagoMembresiaId.value,
      promocion_id: this.pagoPromocionId.value,
    };
  }
}
