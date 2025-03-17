import { PagoClientePrimitive } from '../Interfaces/PagoClientePrimitive';
import { PagoClienteId } from './PagoClienteId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { PagoId } from '@/src/Pagos/Domain/Entities/PagoId';

export class PagoCliente {
  public pagoClienteId: PagoClienteId;
  public pagoCliId: ClienteId;
  public pagoPagId: PagoId;

  public constructor(id: PagoClienteId, cliente_id: ClienteId, pago_id: PagoId) {
    this.pagoClienteId = id;
    this.pagoCliId = cliente_id;
    this.pagoPagId = pago_id;
  }

  public toPagoClientePrimitive(): PagoClientePrimitive {
    return {
      id: this.pagoClienteId.value,
      cliente_id: this.pagoCliId.value,
      pago_id: this.pagoPagId.value,
    };
  }
}
