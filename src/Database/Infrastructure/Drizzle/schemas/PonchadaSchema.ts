import { mysqlTable, int, varchar, datetime, timestamp } from 'drizzle-orm/mysql-core';
import { UsuarioSchema } from './UsuarioSchema';

export const PonchadaSchema = mysqlTable('ponchadas', {
  id: int().autoincrement().primaryKey(),
  fecha: varchar({ length: 19 }).notNull(),
  usuario_id: int()
    .notNull()
    .references(() => UsuarioSchema.id, { onDelete: 'cascade' }),
});
