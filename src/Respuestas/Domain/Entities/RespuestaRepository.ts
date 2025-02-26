import { RespuestaQuery } from '../Interfaces/FirebaseQuery';
import { RespuestaPrimitive } from '../Interfaces/RespuestaPrimitive';

export interface RespuestaRepository {
  create(respuesta: RespuestaPrimitive): Promise<void>;
  getAll(query: RespuestaQuery<RespuestaPrimitive>): Promise<RespuestaPrimitive[]>;
  getById(id: string): Promise<RespuestaPrimitive | null>;
  update(id: string, respuesta: RespuestaPrimitive): Promise<void>;
  delete(id: string): Promise<void>;
}
