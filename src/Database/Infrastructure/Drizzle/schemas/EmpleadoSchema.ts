import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { UsuarioSchema } from './UsuarioSchema';

export const EmpleadoSchema = mysqlTable('empleados', {
  id: int().autoincrement().primaryKey(),
  puesto: varchar({ length: 20 }).notNull(),
  is_admin: varchar({ length: 2 }).notNull(),
  usuario_id: int()
    .references(() => UsuarioSchema.id, { onDelete: 'cascade' })
    .notNull(),
});
