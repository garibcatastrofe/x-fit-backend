import { ClientePrimitive } from './ClientePrimitive';

export type UpdateClienteDto = Partial<
  Omit<ClientePrimitive, 'id' | 'is_admin' | 'tipo'>
>;
