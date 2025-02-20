import { Pago } from '../../Domain/Entities/Pago';
import { PagoId } from '../../Domain/Entities/PagoId';
import { PagoMonto } from '../../Domain/Entities/PagoMonto';
import { PagoFecha } from '../../Domain/Entities/PagoFecha';
import { PagoVencimiento } from '../../Domain/Entities/PagoVencimiento';
import { PagoRepository } from '../../Domain/Entities/PagoRepository';
import { PagoCreateDto } from '../../Domain/Interfaces/PagoCreateDto';

export class CreatePago {
  public constructor(private readonly pagoRepo: PagoRepository) {}

  public async run({ id, monto, fecha_pago, fecha_vencimiento }: PagoCreateDto): Promise<void> {
    const nuevoPago = new Pago(
      id ? new PagoId(id) : PagoId.random(),
      new PagoMonto(monto),
      new PagoFecha(fecha_pago),
      new PagoVencimiento(fecha_vencimiento),
    );
    await this.pagoRepo.create(nuevoPago.toPagoPrimitive());
  }
}
