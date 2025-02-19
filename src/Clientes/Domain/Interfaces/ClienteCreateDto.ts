import { ClientePrimitive } from './ClientePrimitive';

export interface ClienteCreateDto extends Omit<ClientePrimitive, 'id'> {
  id?: number;
}
