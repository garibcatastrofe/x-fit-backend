import { PagoCliente } from '../../Domain/Entities/PagoCliente';
import { PagoClienteId } from '../../Domain/Entities/PagoClienteId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { PagoId } from '@/src/Pagos/Domain/Entities/PagoId';

import { PagoClienteRepository } from '../../Domain/Entities/PagoClienteRepository';
import { ClienteRepository } from '@/src/Clientes/Domain/Entities/ClienteRepository';
import { PagoRepository } from '@/src/Pagos/Domain/Entities/PagoRepository';
import { PagoClienteCreateDto } from '../../Domain/Interfaces/PagoClienteCreateDto';

import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class CreatePagoCliente {
  public constructor(
    private readonly pagoClienteRepo: PagoClienteRepository,
    private readonly clienteRepo: ClienteRepository,
    private readonly pagoRepo: PagoRepository,
  ) {}

  public async run({ id, cliente_id, pago_id }: PagoClienteCreateDto): Promise<void> {
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

    const newPagoCliente = new PagoCliente(
      id ? new PagoClienteId(id) : PagoClienteId.random(),
      new ClienteId(cliente_id),
      new PagoId(pago_id),
    );
    await this.pagoClienteRepo.create(newPagoCliente.toPagoClientePrimitive());
  }
}
