import { ClientePrimitive } from './ClientePrimitive';
import { UsuarioPrimitive } from '@/src/Usuarios/Domain/Interfaces/UsuarioPrimitive';

export interface ClienteWithRelations {
  cliente: ClientePrimitive;
  usuario: UsuarioPrimitive | null;
}
