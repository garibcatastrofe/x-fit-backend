import { EjercicioQuery } from '../Interfaces/FirebaseQuery';
import { EjercicioPrimitive } from '../Interfaces/EjercicioPrimitive';
import { EjercicioWithRelations } from '../Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';

export interface EjercicioRepository {
  create(ejercicio: EjercicioPrimitive): Promise<void>;
  getAll(
    query: EjercicioQuery<EjercicioPrimitive>,
  ): Promise<PaginatedResponse<EjercicioWithRelations>>;
  getById(id: string): Promise<EjercicioPrimitive | null>;
  update(id: string, ejercicio: EjercicioPrimitive): Promise<void>;
  delete(id: string): Promise<void>;
}
