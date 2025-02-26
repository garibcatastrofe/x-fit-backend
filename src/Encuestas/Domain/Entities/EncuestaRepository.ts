import { EncuestaQuery } from '../Interfaces/FirebaseQuery';
import { EncuestaPrimitive } from '../Interfaces/EncuestaPrimitive';

export interface EncuestaRepository {
  create(encuesta: EncuestaPrimitive): Promise<void>;
  getAll(query: EncuestaQuery<EncuestaPrimitive>): Promise<EncuestaPrimitive[]>;
  getById(id: string): Promise<EncuestaPrimitive | null>;
  update(id: string, encuesta: EncuestaPrimitive): Promise<void>;
  delete(id: string): Promise<void>;
}
