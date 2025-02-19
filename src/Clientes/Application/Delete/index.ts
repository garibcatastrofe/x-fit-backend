import { ClienteRepository } from '../../Domain/Entities/ClienteRepository';

export class DeleteCliente {
  public constructor(private readonly clienteRepo: ClienteRepository) {}
  public async run(id: number): Promise<void> {
    await this.clienteRepo.getById(id);
    await this.clienteRepo.delete(id);
  }
}
