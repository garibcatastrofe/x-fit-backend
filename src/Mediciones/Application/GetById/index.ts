import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { MedicionId } from '../../Domain/Entities/MedicionId';
import { MedicionRepository } from '../../Domain/Entities/MedicionRepository';
import { MedicionPrimitive } from '../../Domain/Interfaces/MedicionPrimitive';

export class GetMedicionById {
  public constructor(private readonly medicionRepository: MedicionRepository) {}

  public async run(id: string): Promise<MedicionPrimitive | null> {
    const idConvertido = new MedicionId(id);
    const medicionEncontrada = await this.medicionRepository.getById(idConvertido.value);

    if (!medicionEncontrada) {
      throw new NotFoundException({
        message: `La medicion con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return medicionEncontrada ?? null;
  }
}
