import { RuffierPrimitive } from './RuffierPrimitive';

export interface RuffierCreateDto extends Omit<RuffierPrimitive, 'id'> {
  id?: string;
}
