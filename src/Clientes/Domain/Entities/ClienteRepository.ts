import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { ClientePrimitive } from '../Interfaces/ClientePrimitive';

export interface ClienteRepository {
  create(cliente: ClientePrimitive): Promise<void>;
  getAll(query: IQuery<ClientePrimitive>): Promise<ClientePrimitive[]>;
  getById(id: number): Promise<ClientePrimitive | null>;
  update(id: number, cliente: ClientePrimitive): Promise<void>;
  delete(id: number): Promise<void>;
}
