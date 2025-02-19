import { PonchadaPrimitive } from './PonchadaPrimitive';

export type UpdatePonchadaDto = Partial<Omit<PonchadaPrimitive, 'id' | 'fecha'>>;
