import { mysqlTable, int, date, double, varchar, mysqlEnum } from 'drizzle-orm/mysql-core';

export const PromocionSchema = mysqlTable('promociones', {
  id: int().autoincrement().primaryKey(),
  nombre: varchar({ length: 50 }).notNull(),
  descuento: double().notNull(),
  tipoDescuento: mysqlEnum(['PORCENTAJE', 'MONTO FIJO']).default('PORCENTAJE'),
  fechaInicio: date().notNull(),
  fechaVencimiento: date().notNull(),
  estatus: mysqlEnum(['ACTIVA', 'INACTIVA']).default('ACTIVA'),
});
