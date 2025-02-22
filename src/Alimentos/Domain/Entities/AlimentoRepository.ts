import { AlimentoQuery } from '../Interfaces/Query';
import { AlimentoPrimitive } from '../Interfaces/AlimentoPrimitive';

export interface AlimentoRepository {
  create(alimento: AlimentoPrimitive): Promise<void>;
  getAll(query: AlimentoQuery<AlimentoPrimitive>): Promise<AlimentoPrimitive[]>;
  getById(id: string): Promise<AlimentoPrimitive | null>;
  update(id: string, alimento: AlimentoPrimitive): Promise<void>;
  delete(id: string): Promise<void>;
}
