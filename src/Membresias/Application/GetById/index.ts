import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { MembresiaId } from '../../Domain/Entities/MembresiaId';
import { MembresiaRepository } from '../../Domain/Entities/MembresiaRepository';
import { MembresiaPrimitive } from '../../Domain/Interfaces/MembresiaPrimitive';

export class GetMembresiaById {
  public constructor(private readonly membresiaRepository: MembresiaRepository) {}

  public async run(id: number): Promise<MembresiaPrimitive | null> {
    const idConvertido = new MembresiaId(id);
    const membresiaEncontrada = await this.membresiaRepository.getById(idConvertido.value);

    if (!membresiaEncontrada) {
      throw new NotFoundException({
        message: `La membresia con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return membresiaEncontrada ?? null;
  }
}
