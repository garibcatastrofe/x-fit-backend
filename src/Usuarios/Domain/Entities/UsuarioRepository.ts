import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { UsuarioPrimitive } from '../Interfaces/UsuarioPrimitive';

export interface UsuarioRepository {
  create(usuario: UsuarioPrimitive): Promise<void>;
  getAll(query: IQuery<UsuarioPrimitive>): Promise<UsuarioPrimitive[]>;
  getById(id: number): Promise<UsuarioPrimitive | null>;
  update(id: number, usuario: UsuarioPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
  login(correo: string, password: string): Promise<UsuarioPrimitive[]>;
  verify(): Promise<void>;
  logout(): Promise<void>;
}
