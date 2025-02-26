import { RespuestaPrimitive } from './RespuestaPrimitive';

export interface RespuestaCreateDto extends Omit<RespuestaPrimitive, 'id'> {
  id?: string;
}
