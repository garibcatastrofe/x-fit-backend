import { PagoClienteRepository } from '../../Domain/Entities/PagoClienteRepository';
import { PagoClientePrimitive } from '../../Domain/Interfaces/PagoClientePrimitive';

export class UpdatePagoCliente {
  public constructor(private readonly pagoClienteRepo: PagoClienteRepository) {}

  public async run(id: number, pagoCliente: PagoClientePrimitive): Promise<void> {
    await this.pagoClienteRepo.getById(id);
    await this.pagoClienteRepo.update(id, pagoCliente);
  }
}
