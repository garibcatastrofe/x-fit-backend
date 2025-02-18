import { mysqlTable, int } from 'drizzle-orm/mysql-core';
import { ClienteSchema } from './ClienteSchema';
import { PagoSchema } from './PagoSchema';
import { MembresiaSchema } from './MembresiaSchema';
import { PromocionSchema } from './PromocionSchema';

export const ClientePagoMembresiaPromocionSchema = mysqlTable('cliente_pago_membresia_promocion', {
  id: int().autoincrement().primaryKey(),
  cliente_id: int()
    .notNull()
    .references(() => ClienteSchema.id, { onDelete: 'cascade' }),
  pago_id: int()
    .notNull()
    .references(() => PagoSchema.id, { onDelete: 'cascade' }),
  membresia_id: int()
    .notNull()
    .references(() => MembresiaSchema.id, { onDelete: 'cascade' }),
  promocion_id: int()
    .notNull()
    .references(() => PromocionSchema.id, { onDelete: 'cascade' }),
});
