import { Pago } from '../../Domain/Entities/Pago';
import { PagoId } from '../../Domain/Entities/PagoId';
import { PagoMonto } from '../../Domain/Entities/PagoMonto';
import { PagoFecha } from '../../Domain/Entities/PagoFecha';
import { PagoVencimiento } from '../../Domain/Entities/PagoVencimiento';
import { MembresiaId } from '@/src/Membresias/Domain/Entities/MembresiaId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { PromocionId } from '@/src/Promociones/Domain/Entities/PromocionId';

import { PagoRepository } from '../../Domain/Entities/PagoRepository';
import { MembresiaRepository } from '@/src/Membresias/Domain/Entities/MembresiaRepository';
import { ClienteRepository } from '@/src/Clientes/Domain/Entities/ClienteRepository';
import { PromocionRepository } from '@/src/Promociones/Domain/Entities/PromocionRepository';
import { PagoCreateDto } from '../../Domain/Interfaces/PagoCreateDto';

import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class CreatePago {
  public constructor(
    private readonly pagoRepo: PagoRepository,
    private readonly membresiaRepo: MembresiaRepository,
    private readonly clienteRepo: ClienteRepository,
    private readonly promocionRepo: PromocionRepository,
  ) {}

  public async run({
    id,
    monto,
    fecha_pago,
    fecha_vencimiento,
    membresia_id,
    cliente_id,
    promocion_id,
  }: PagoCreateDto): Promise<void> {
    const membresia = await this.membresiaRepo.getById(membresia_id);
    if (!membresia) {
      throw new BadRequest({
        message: 'La membresia no existe',
        campo: 'membresia_id',
        data: membresia_id,
      });
    }

    const cliente = await this.clienteRepo.getById(cliente_id);
    if (!cliente) {
      throw new BadRequest({
        message: 'El cliente no existe',
        campo: 'cliente_id',
        data: cliente_id,
      });
    }

    const promocion = await this.promocionRepo.getById(promocion_id);
    if (!promocion) {
      throw new BadRequest({
        message: 'La promocion no existe',
        campo: 'promocion_id',
        data: promocion_id,
      });
    }

    const newPago = new Pago(
      id ? new PagoId(id) : PagoId.random(),
      new PagoMonto(monto),
      new PagoFecha(fecha_pago),
      new PagoVencimiento(fecha_vencimiento),
      new MembresiaId(membresia_id),
      new ClienteId(cliente_id),
      new PromocionId(promocion_id),
    );
    await this.pagoRepo.create(newPago.toPagoPrimitive());
  }
}
