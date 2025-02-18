import { mysqlTable, int, date } from 'drizzle-orm/mysql-core';
import { UsuarioSchema } from './UsuarioSchema';

export const PonchadaSchema = mysqlTable('ponchadas', {
  id: int().autoincrement().primaryKey(),
  fecha: date().notNull(),
  usuario_id: int()
    .notNull()
    .references(() => UsuarioSchema.id, { onDelete: 'cascade' }),
});
