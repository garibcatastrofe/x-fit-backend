//import { DietaQuery } from '../Interfaces/FirebaseQuery';
import { DietaPrimitive } from '../Interfaces/DietaPrimitive';

export interface DietaRepository {
  create(dieta: DietaPrimitive): Promise<void>;
  /* getAll(query: DietaQuery<DietaPrimitive>): Promise<DietaPrimitive[]>;
  getById(id: string): Promise<DietaPrimitive | null>;
  update(id: string, dieta: DietaPrimitive): Promise<void>;
  delete(id: string): Promise<void>; */
}
