import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { EjercicioId } from '../../Domain/Entities/EjercicioId';
import { EjercicioRepository } from '../../Domain/Entities/EjercicioRepository';
import { EjercicioPrimitive } from '../../Domain/Interfaces/EjercicioPrimitive';

export class GetEjercicioById {
  public constructor(private readonly ejercicioRepository: EjercicioRepository) {}

  public async run(id: string): Promise<EjercicioPrimitive | null> {
    const idConvertido = new EjercicioId(id);
    const ejercicioEncontrado = await this.ejercicioRepository.getById(idConvertido.value);

    if (!ejercicioEncontrado) {
      throw new NotFoundException({
        message: `El ejercicio con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return ejercicioEncontrado ?? null;
  }
}
