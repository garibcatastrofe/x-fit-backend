import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const PromocionSchema = mysqlTable('promociones', {
  id: int().autoincrement().primaryKey(),
  nombre: varchar({ length: 50 }).notNull(),
  descuento: int().notNull(),
  tipo_descuento: varchar({ length: 20 }).notNull(),
  fecha_inicio: varchar({ length: 19 }).notNull(),
  fecha_vencimiento: varchar({ length: 19 }).notNull(),
  estatus: varchar({ length: 20 }).notNull(),
  descripcion: varchar({ length: 200 }).notNull(),
});
