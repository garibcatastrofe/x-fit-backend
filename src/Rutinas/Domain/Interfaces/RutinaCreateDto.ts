import { RutinaPrimitive } from './RutinaPrimitive';

export interface RutinaCreateDto extends Omit<RutinaPrimitive, 'id'> {
  id?: string;
}
