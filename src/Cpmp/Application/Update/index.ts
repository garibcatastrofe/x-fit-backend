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

import { UpdateCpmpDto } from '../../Domain/Interfaces/UpdateCpmpDto';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class UpdateCpmp {
  public constructor(
    private readonly cpmpRepo: CpmpRepository,
    private readonly clienteRepo: ClienteRepository,
    private readonly pagoRepo: PagoRepository,
    private readonly membresiaRepo: MembresiaRepository,
    private readonly promocionRepo: PromocionRepository,
  ) {}

  public async run(
    id: number,
    { cliente_id, pago_id, membresia_id, promocion_id }: UpdateCpmpDto,
  ): Promise<void> {
    const cpmpId = new CpmpId(id);

    const cpmpViejo = await this.cpmpRepo.getById(cpmpId.value);

    if (cliente_id) await this.clienteRepo.getById(cliente_id);

    if (!cliente_id) {
      throw new BadRequest({
        message: 'El cliente con ese id no existe',
        campo: 'cliente_id',
        data: cliente_id,
      });
    }

    if (pago_id) await this.pagoRepo.getById(pago_id);

    if (!pago_id) {
      throw new BadRequest({
        message: 'El pago con ese id no existe',
        campo: 'pago_id',
        data: pago_id,
      });
    }

    if (membresia_id) await this.membresiaRepo.getById(membresia_id);

    if (!membresia_id) {
      throw new BadRequest({
        message: 'La membresia con ese id no existe',
        campo: 'membresia_id',
        data: membresia_id,
      });
    }

    if (promocion_id) await this.promocionRepo.getById(promocion_id);

    if (!promocion_id) {
      throw new BadRequest({
        message: 'La promoción con ese id no existe',
        campo: 'usuario_id',
        data: promocion_id,
      });
    }

    const newCpmp = new Cpmp(
      new CpmpId(cpmpId.value),
      new ClienteId(cliente_id),
      new PagoId(pago_id),
      new MembresiaId(membresia_id),
      new PromocionId(promocion_id),
    );
    await this.cpmpRepo.update(cpmpId.value, newCpmp.toPrimitive());
  }
}
