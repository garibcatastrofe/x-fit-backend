import { ClientePrimitive } from './ClientePrimitive';

export type UpdateClienteDto = Partial<
  Omit<ClientePrimitive, 'id' | 'tipo'>
>;
