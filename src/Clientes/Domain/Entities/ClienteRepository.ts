import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { ClientePrimitive } from '../Interfaces/ClientePrimitive';
import { UsuarioPrimitive } from '../../../Usuarios/Domain/Interfaces/UsuarioPrimitive';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { ClienteWithRelations } from '../Interfaces/Responses';

export interface ClienteRepository {
  create(cliente: ClientePrimitive): Promise<void>;
  getAll(
    query: IQuery<ClientePrimitive | UsuarioPrimitive>,
  ): Promise<PaginatedResponse<ClienteWithRelations>>;
  getById(id: number): Promise<ClientePrimitive | null>;
  update(id: number, cliente: ClientePrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
