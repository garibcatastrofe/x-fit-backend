import { PagoPrimitive } from '../Interfaces/PagoPrimitive';
import { PagoId } from './PagoId';
import { PagoMonto } from './PagoMonto';
import { PagoFecha } from './PagoFecha';
import { PagoVencimiento } from './PagoVencimiento';

export class Pago {
  public pagoId: PagoId;
  public pagoMonto: PagoMonto;
  public pagoFecha: PagoFecha;
  public pagoVencimiento: PagoVencimiento;

  public constructor(id: PagoId, monto: PagoMonto, fecha: PagoFecha, vencimiento: PagoVencimiento) {
    (this.pagoId = id),
      (this.pagoMonto = monto),
      (this.pagoFecha = fecha),
      (this.pagoVencimiento = vencimiento);
  }

  public toPagoPrimitive(): PagoPrimitive {
    return {
      id: this.pagoId.value,
      monto: this.pagoMonto.value,
      fecha_pago: this.pagoFecha.value,
      fecha_vencimiento: this.pagoVencimiento.value,
    };
  }
}
