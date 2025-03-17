/* import { ClientePrimitive } from '@/src/Clientes/Domain/Interfaces/ClientePrimitive';
import { PagoPrimitive } from './PagoPrimitive';
import { MembresiaPrimitive } from '@/src/Membresias/Domain/Interfaces/MembresiaPrimitive';
import { PagoClientePrimitive } from '@/src/PagosClientes/Domain/Interfaces/PagoClientePrimitive';
import { PromocionPrimitive } from '@/src/Promociones/Domain/Interfaces/PromocionPrimitive';
import { UsuarioPrimitive } from '@/src/Usuarios/Domain/Interfaces/UsuarioPrimitive'; */

export interface PagoWithRelations {
  /* pago: PagoPrimitive;
  membresia: MembresiaPrimitive | null;
  promocion: PromocionPrimitive | null;
  pago_cliente: PagoClientePrimitive | null;
  cliente: ClientePrimitive | null;
  usuario: UsuarioPrimitive | null; */
  id: number;
  monto: number;
  fecha_pago: string;
  fecha_vencimiento: string;
  membresia_id: number;
  membresia_nombre: string | null;
  promocion_id: number;
  promocion_nombre: string | null;
  cliente_nombre: unknown;
}
