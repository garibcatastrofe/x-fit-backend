import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { PagoClienteRepository } from '../../Domain/Entities/PagoClienteRepository';
import { PagoClientePrimitive } from '../../Domain/Interfaces/PagoClientePrimitive';

export class GetAllPagosCliente {
  public constructor(private readonly pagoClienteRepo: PagoClienteRepository) {}

  public async run(query: IQuery<PagoClientePrimitive>): Promise<PagoClientePrimitive[]> {
    const pagosClientes = await this.pagoClienteRepo.getAll(query);

    return pagosClientes;
  }
}
