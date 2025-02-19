import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { UsuarioSchema } from './UsuarioSchema';

export const PonchadaSchema = mysqlTable('ponchadas', {
  id: int().autoincrement().primaryKey(),
  fecha: varchar({ length: 19 }),
  usuario_id: int()
    .notNull()
    .references(() => UsuarioSchema.id, { onDelete: 'cascade' }),
});
