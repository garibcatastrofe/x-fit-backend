import { MedicionQuery } from '../Interfaces/FirebaseQuery';
import { MedicionPrimitive } from '../Interfaces/MedicionPrimitive';

export interface MedicionRepository {
  create(medicion: MedicionPrimitive): Promise<void>;
  getAll(query: MedicionQuery<MedicionPrimitive>): Promise<MedicionPrimitive[]>;
  getById(id: string): Promise<MedicionPrimitive | null>;
  update(id: string, medicion: MedicionPrimitive): Promise<void>;
  delete(id: string): Promise<void>;
}
