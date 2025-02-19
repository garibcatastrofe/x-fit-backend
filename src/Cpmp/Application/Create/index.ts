import { Cpmp } from '../../Domain/Entities/Cpmp';
import { CpmpId } from '../../Domain/Entities/CpmpId';

import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { PagoId } from '@/src/Pagos/Domain/Entities/PagoId';
import { MembresiaId } from '@/src/Membresias/Domain/Entities/MembresiaId';
import { PromocionId } from '@/src/Promociones/Domain/Entities/PromocionId';

import { CpmpRepository } from '../../Domain/Entities/CpmpRepository';
import { ClienteRepository } from '@/src/Clientes/Domain/Entities/ClienteRepository';
import { PagoRepository } from '@/src/Pagos/Domain/Entities/PagoRepository';
import { MembresiaRepository } from '@/src/Membresias/Domain/Entities/MembresiaRepository';
import { PromocionRepository } from '@/src/Promociones/Domain/Entities/PromocionRepository';

import { CpmpCreateDto } from '../../Domain/Interfaces/CpmpCreateDto';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class CreateCpmp {
  public constructor(
    private readonly cpmpRepo: CpmpRepository,
    private readonly clienteRepo: ClienteRepository,
    private readonly pagoRepo: PagoRepository,
    private readonly membresiaRepo: MembresiaRepository,
    private readonly promocionRepo: PromocionRepository,
  ) {}

  public async run({
    id,
    cliente_id,
    pago_id,
    membresia_id,
    promocion_id,
  }: CpmpCreateDto): Promise<void> {
    const cliente = await this.clienteRepo.getById(cliente_id);
    if (!cliente) {
      throw new BadRequest({
        message: 'El cliente no existe',
        campo: 'cliente_id',
        data: cliente_id,
      });
    }

    const pago = await this.pagoRepo.getById(pago_id);
    if (!pago) {
      throw new BadRequest({
        message: 'El pago no existe',
        campo: 'pago_id',
        data: pago_id,
      });
    }

    const membresia = await this.membresiaRepo.getById(membresia_id);
    if (!membresia) {
      throw new BadRequest({
        message: 'La membresia no existe',
        campo: 'membresia_id',
        data: membresia_id,
      });
    }

    const promocion = await this.promocionRepo.getById(promocion_id);
    if (!promocion) {
      throw new BadRequest({
        message: 'La promoción no existe',
        campo: 'promocion_id',
        data: promocion_id,
      });
    }

    const newCpmp = new Cpmp(
      id ? new CpmpId(id) : CpmpId.random(),
      new ClienteId(cliente_id),
      new PagoId(pago_id),
      new MembresiaId(membresia_id),
      new PromocionId(promocion_id),
    );
    await this.cpmpRepo.create(newCpmp.toPrimitive());
  }
}
