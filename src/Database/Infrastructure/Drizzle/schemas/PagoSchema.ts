import { mysqlTable, int, date, double } from 'drizzle-orm/mysql-core';

export const PagoSchema = mysqlTable('pagos', {
  id: int().autoincrement().primaryKey(),
  monto: double().notNull(),
  fechaPago: date().notNull(),
  fechaVencimiento: date().notNull(),
});
