import { CpmpPrimitive } from './CpmpPrimitive';

export type UpdateCpmpDto = Partial<Omit<CpmpPrimitive, 'id'>>;
