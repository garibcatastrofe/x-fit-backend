import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { EmpleadoPrimitive } from '../../Domain/Interfaces/EmpleadoPrimitive';
import { EmpleadoRepository } from '../../Domain/Entities/EmpleadoRepository';
import { UsuarioPrimitive } from '../../../Usuarios/Domain/Interfaces/UsuarioPrimitive';
import { EmpleadoWithRelations } from '../../Domain/Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';

export class GetAllEmpleado {
  public constructor(private readonly empleadoRepository: EmpleadoRepository) {}

  public async run(
    query: IQuery<EmpleadoPrimitive | UsuarioPrimitive>,
  ): Promise<PaginatedResponse<EmpleadoWithRelations>> {
    const empleados = await this.empleadoRepository.getAll(query);
    return empleados;
  }
}
