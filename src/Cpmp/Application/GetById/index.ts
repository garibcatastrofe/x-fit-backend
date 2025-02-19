import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { CpmpId } from '../../Domain/Entities/CpmpId';
import { CpmpRepository } from '../../Domain/Entities/CpmpRepository';
import { CpmpPrimitive } from '../../Domain/Interfaces/CpmpPrimitive';

export class GetCpmpById {
  public constructor(private readonly cpmpRepository: CpmpRepository) {}

  public async run(id: number): Promise<CpmpPrimitive | null> {
    const idConvertido = new CpmpId(id);
    const cpmpEncontrado = await this.cpmpRepository.getById(idConvertido.value);

    if (!cpmpEncontrado) {
      throw new NotFoundException({
        message: `El cpmp con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return cpmpEncontrado ?? null;
  }
}
