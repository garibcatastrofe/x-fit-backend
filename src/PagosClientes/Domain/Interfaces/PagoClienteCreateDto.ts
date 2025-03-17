import { PagoClientePrimitive } from './PagoClientePrimitive';

export interface PagoClienteCreateDto extends Omit<PagoClientePrimitive, 'id'> {
  id?: number;
}
