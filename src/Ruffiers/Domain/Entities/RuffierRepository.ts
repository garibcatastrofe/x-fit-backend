import { RuffierQuery } from '../Interfaces/FirebaseQuery';
import { RuffierPrimitive } from '../Interfaces/RuffierPrimitive';

export interface RuffierRepository {
  create(ruffier: RuffierPrimitive): Promise<void>;
  getAll(query: RuffierQuery<RuffierPrimitive>): Promise<RuffierPrimitive[]>;
  getById(id: string): Promise<RuffierPrimitive | null>;
  update(id: string, ruffier: RuffierPrimitive): Promise<void>;
  delete(id: string): Promise<void>;
}
