import { EjercicioQuery } from '../Interfaces/FirebaseQuery';
import { EjercicioPrimitive } from '../Interfaces/EjercicioPrimitive';

export interface EjercicioRepository {
  create(ejercicio: EjercicioPrimitive): Promise<void>;
  getAll(query: EjercicioQuery<EjercicioPrimitive>): Promise<EjercicioPrimitive[]>;
  getById(id: string): Promise<EjercicioPrimitive | null>;
  update(id: string, ejercicio: EjercicioPrimitive): Promise<void>;
  delete(id: string): Promise<void>;
}
