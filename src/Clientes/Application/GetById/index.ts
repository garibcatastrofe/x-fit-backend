import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { ClienteId } from '../../Domain/Entities/ClienteId';
import { ClienteRepository } from '../../Domain/Entities/ClienteRepository';
import { ClientePrimitive } from '../../Domain/Interfaces/ClientePrimitive';

export class GetClienteById {
  public constructor(private readonly clienteRepository: ClienteRepository) {}

  public async run(id: number): Promise<ClientePrimitive | null> {
    const idConvertido = new ClienteId(id);
    const clienteEncontrado = await this.clienteRepository.getById(idConvertido.value);

    if (!clienteEncontrado) {
      throw new NotFoundException({
        message: `El cliente con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return clienteEncontrado ?? null;
  }
}
