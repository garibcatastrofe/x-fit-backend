import { mysqlTable, int } from 'drizzle-orm/mysql-core';
import { ClienteSchema } from './ClienteSchema';
import { PagoSchema } from './PagoSchema';

export const PagoClienteSchema = mysqlTable('pagos_clientes', {
  id: int().autoincrement().primaryKey(),
  cliente_id: int()
    .notNull()
    .references(() => ClienteSchema.id, { onDelete: 'cascade' }),
  pago_id: int()
    .notNull()
    .references(() => PagoSchema.id, { onDelete: 'cascade' }),
});
