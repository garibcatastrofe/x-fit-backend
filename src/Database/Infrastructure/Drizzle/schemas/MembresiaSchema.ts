import { mysqlTable, int, varchar, double } from 'drizzle-orm/mysql-core';

export const MembresiaSchema = mysqlTable('membresias', {
  id: int().autoincrement().primaryKey(),
  nombre: varchar({ length: 50 }).notNull(),
  precio: double().notNull(),
  duracion_meses: int().notNull(),
  descripcion: varchar({ length: 200 }).notNull(),
});
