import { IQuery } from '../../../Shared/Domain/Interfaces/QueryCompleteSearch';
import { UsuarioPrimitive } from '../Interfaces/UsuarioPrimitive';
import { UsuarioWithRelations } from '../Interfaces/Responses';
import { PaginatedResponseUsuarios } from '@/src/Shared/Domain/Interfaces/Responses';

export interface UsuarioRepository {
  create(usuario: UsuarioPrimitive): Promise<void>;
  getAll(query: IQuery<UsuarioPrimitive>): Promise<PaginatedResponseUsuarios<UsuarioWithRelations>>;
  getById(id: number): Promise<UsuarioPrimitive | null>;
  update(id: number, usuario: UsuarioPrimitive): Promise<void>;
  delete(id: number): Promise<void>;
  login(correo: string, password: string): Promise<UsuarioPrimitive[]>;
  verify(): Promise<void>;
  logout(): Promise<void>;
}
