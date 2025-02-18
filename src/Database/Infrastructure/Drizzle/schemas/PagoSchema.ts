import { mysqlTable, int, date } from 'drizzle-orm/mysql-core';

export const PagoSchema = mysqlTable('pagos', {
  id: int().autoincrement().primaryKey(),
  monto: int().notNull(),
  fecha_pago: date().notNull(),
  fecha_vencimiento: date().notNull(),
});
