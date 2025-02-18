import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { EmpleadoRepository } from '../../Domain/Entities/EmpleadoRepository';
import { EmpleadoPrimitive } from '../../Domain/Interfaces/EmpleadoPrimitive';

export class GetEmpleadoById {
  public constructor(private empleadoRepository: EmpleadoRepository) {}

  public async run(id: number): Promise<EmpleadoPrimitive | null> {
    const empleado = await this.empleadoRepository.getById(id);

    if (!empleado) {
      throw new NotFoundException({
        message: `El empleado con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return empleado;
  }
}
