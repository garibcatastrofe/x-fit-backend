import { PagoClienteRepository } from '../../Domain/Entities/PagoClienteRepository';

export class DeletePagoCliente {
  public constructor(private readonly pagoClienteRepo: PagoClienteRepository) {}

  public async run(id: number): Promise<void> {
    await this.pagoClienteRepo.getById(id);
    await this.pagoClienteRepo.delete(id);
  }
}
