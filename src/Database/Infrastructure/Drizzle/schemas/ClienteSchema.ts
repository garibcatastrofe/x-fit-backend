import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { UsuarioSchema } from './UsuarioSchema';

export const ClienteSchema = mysqlTable('clientes', {
  id: int().autoincrement().primaryKey(),
  fecha_inicio: varchar({ length: 19 }).notNull(),
  tipo: varchar({ length: 20 }).notNull(),
  usuario_id: int()
    .notNull()
    .references(() => UsuarioSchema.id, { onDelete: 'cascade' }),
});
