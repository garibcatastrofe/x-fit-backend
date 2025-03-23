import { PonchadaPrimitive } from './PonchadaPrimitive';
import { UsuarioPrimitive } from '@/src/Usuarios/Domain/Interfaces/UsuarioPrimitive';

export interface PonchadaWithRelations {
  ponchada: PonchadaPrimitive;
  usuario: UsuarioPrimitive | null;
}

export interface PaginatedResponsePonchadas<T> {
  data: T[];
  countPonchadas: number;
}
