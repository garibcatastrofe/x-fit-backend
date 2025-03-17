import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { EmpleadoPrimitive } from '../Interfaces/EmpleadoPrimitive';
import { UsuarioPrimitive } from '../../../Usuarios/Domain/Interfaces/UsuarioPrimitive';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { EmpleadoWithRelations } from '../Interfaces/Responses';

export interface EmpleadoRepository {
  create(empleado: EmpleadoPrimitive): Promise<void>;
  getAll(
    query: IQuery<EmpleadoPrimitive | UsuarioPrimitive>,
  ): Promise<PaginatedResponse<EmpleadoWithRelations>>;
  getById(id: number): Promise<EmpleadoPrimitive | null>;
  update(id: number, empleado: EmpleadoPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
