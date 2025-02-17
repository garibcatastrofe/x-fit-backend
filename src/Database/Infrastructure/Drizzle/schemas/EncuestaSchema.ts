import { mysqlTable, int } from 'drizzle-orm/mysql-core';
import { EmpleadoSchema } from './EmpleadoSchema';

export const EncuestaSchema = mysqlTable('encuestas', {
  id: int().autoincrement().primaryKey(),
  empleado_id: int().references(() => EmpleadoSchema.id),
});
