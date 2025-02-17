import { UsuarioPrimitive } from './UsuarioPrimitive';

export interface UsuarioCreateDto extends Omit<UsuarioPrimitive, 'id'> {
  id?: number;
}
