import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { EmpleadoPrimitive } from '../Interfaces/EmpleadoPrimitive';

export interface EmpleadoRepository {
  create(empleado: EmpleadoPrimitive): Promise<void>;
  getAll(query: IQuery<EmpleadoPrimitive>): Promise<EmpleadoPrimitive[]>;
  getById(id: number): Promise<EmpleadoPrimitive | null>;
  update(id: number, empleado: EmpleadoPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
