import { mysqlTable, int } from 'drizzle-orm/mysql-core';
import { ClienteSchema } from './ClienteSchema';
import { PagoSchema } from './PagoSchema';
import { MembresiaSchema } from './MembresiaSchema';
import { PromocionSchema } from './PromocionSchema';

export const ClientePagoMembresiaPromocionSchema = mysqlTable('cliente_pago_membresia_promocion', {
  id: int().autoincrement().primaryKey(),
  cliente_id: int().references(() => ClienteSchema.id),
  pago_id: int().references(() => PagoSchema.id),
  membresia_id: int().references(() => MembresiaSchema.id),
  promocion_id: int().references(() => PromocionSchema.id),
});
