import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const PagoSchema = mysqlTable('pagos', {
  id: int().autoincrement().primaryKey(),
  monto: int().notNull(),
  fecha_pago: varchar({ length: 19 }).notNull(),
  fecha_vencimiento: varchar({ length: 19 }).notNull(),
});
