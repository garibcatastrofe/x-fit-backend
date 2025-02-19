import { CpmpId } from '@/src/Cpmp/Domain/Entities/CpmpId';

import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { PagoId } from '@/src/Pagos/Domain/Entities/PagoId';
import { MembresiaId } from '@/src/Membresias/Domain/Entities/MembresiaId';
import { PromocionId } from '@/src/Promociones/Domain/Entities/PromocionId';

import { CpmpPrimitive } from '../Interfaces/CpmpPrimitive';

export class Cpmp {
  public cpmpId: CpmpId;
  public cpmpClienteId: ClienteId;
  public cpmpPagoId: PagoId;
  public cpmpMembresiaId: MembresiaId;
  public cpmpPromocionId: PromocionId;
  public constructor(
    id: CpmpId,
    cpmpClienteId: ClienteId,
    cpmpPagoId: PagoId,
    cpmpMembresiaId: MembresiaId,
    cpmpPromocionId: PromocionId,
  ) {
    this.cpmpId = id;
    this.cpmpClienteId = cpmpClienteId;
    this.cpmpPagoId = cpmpPagoId;
    this.cpmpMembresiaId = cpmpMembresiaId;
    this.cpmpPromocionId = cpmpPromocionId;
  }

  public toPrimitive(): CpmpPrimitive {
    return {
      id: this.cpmpId.value,
      cliente_id: this.cpmpClienteId.value,
      pago_id: this.cpmpPagoId.value,
      membresia_id: this.cpmpMembresiaId.value,
      promocion_id: this.cpmpPromocionId.value,
    };
  }
}
