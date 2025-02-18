import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { EmpleadoPrimitive } from '../../Domain/Interfaces/EmpleadoPrimitive';
import { EmpleadoRepository } from '../../Domain/Entities/EmpleadoRepository';

export class GetAllEmpleado {
  public constructor(private empleadoRepository: EmpleadoRepository) {}

  public async run(query: IQuery<EmpleadoPrimitive>): Promise<EmpleadoPrimitive[]> {
    return await this.empleadoRepository.getAll(query);
  }
}
