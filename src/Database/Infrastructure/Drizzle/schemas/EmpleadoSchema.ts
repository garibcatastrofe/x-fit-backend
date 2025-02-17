import { mysqlTable, int, mysqlEnum, varchar } from 'drizzle-orm/mysql-core';
import { UsuarioSchema } from './UsuarioSchema';

export const EmpleadoSchema = mysqlTable('empleados', {
  id: int().autoincrement().primaryKey(),
  puesto: varchar({ length: 20 }).notNull(),
  isAdmin: mysqlEnum(['SI', 'NO']).default('NO'),
  usuario_id: int().references(() => UsuarioSchema.id),
});
