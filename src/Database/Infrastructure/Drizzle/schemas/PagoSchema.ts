import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { ClienteSchema } from './ClienteSchema';
import { MembresiaSchema } from './MembresiaSchema';
import { PromocionSchema } from './PromocionSchema';

export const PagoSchema = mysqlTable('pagos', {
  id: int().autoincrement().primaryKey(),
  monto: int().notNull(),
  fecha_pago: varchar({ length: 19 }).notNull(),
  fecha_vencimiento: varchar({ length: 19 }).notNull(),
  membresia_id: int()
    .notNull()
    .references(() => MembresiaSchema.id, { onDelete: 'cascade' }),
  cliente_id: int()
    .notNull()
    .references(() => ClienteSchema.id, { onDelete: 'cascade' }),
  promocion_id: int()
    .notNull()
    .references(() => PromocionSchema.id, { onDelete: 'cascade' }),
});
