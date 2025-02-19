import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { EmpleadoId } from '../../Domain/Entities/EmpleadoId';
import { EmpleadoRepository } from '../../Domain/Entities/EmpleadoRepository';
import { EmpleadoPrimitive } from '../../Domain/Interfaces/EmpleadoPrimitive';

export class GetEmpleadoById {
  public constructor(private readonly empleadoRepository: EmpleadoRepository) {}

  public async run(id: number): Promise<EmpleadoPrimitive | null> {
    const idConvertido = new EmpleadoId(id);
    const empleadoEncontrado = await this.empleadoRepository.getById(idConvertido.value);

    if (!empleadoEncontrado) {
      throw new NotFoundException({
        message: `El empleado con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return empleadoEncontrado ?? null;
  }
}
