import { RutinaQuery } from '../Interfaces/FirebaseQuery';
import { RutinaPrimitive } from '../Interfaces/RutinaPrimitive';

export interface RutinaRepository {
  create(dieta: RutinaPrimitive): Promise<void>;
  getAll(query: RutinaQuery<RutinaPrimitive>): Promise<RutinaPrimitive[]>;
  getById(id: string): Promise<RutinaPrimitive | null>;
  update(id: string, dieta: RutinaPrimitive): Promise<void>;
  delete(id: string): Promise<void>;
}
