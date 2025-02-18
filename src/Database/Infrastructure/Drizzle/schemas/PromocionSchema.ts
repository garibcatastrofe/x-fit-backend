import { mysqlTable, int, date, varchar } from 'drizzle-orm/mysql-core';

export const PromocionSchema = mysqlTable('promociones', {
  id: int().autoincrement().primaryKey(),
  nombre: varchar({ length: 50 }).notNull(),
  descuento: int().notNull(),
  tipo_descuento: varchar({ length: 20 }).notNull(),
  fecha_inicio: date().notNull(),
  fecha_vencimiento: date().notNull(),
  estatus: varchar({ length: 20 }).notNull(),
});
