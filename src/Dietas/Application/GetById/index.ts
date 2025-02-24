import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { DietaId } from '../../Domain/Entities/DietaId';
import { DietaRepository } from '../../Domain/Entities/DietaRepository';
import { DietaPrimitive } from '../../Domain/Interfaces/DietaPrimitive';

export class GetDietaById {
  public constructor(private readonly dietaRepository: DietaRepository) {}

  public async run(id: string): Promise<DietaPrimitive | null> {
    const idConvertido = new DietaId(id);
    const dietaEncontrada = await this.dietaRepository.getById(idConvertido.value);

    if (!dietaEncontrada) {
      throw new NotFoundException({
        message: `La dieta con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return dietaEncontrada ?? null;
  }
}
