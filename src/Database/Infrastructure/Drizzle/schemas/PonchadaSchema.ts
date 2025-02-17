import { mysqlTable, int, date } from 'drizzle-orm/mysql-core';
import { UsuarioSchema } from './UsuarioSchema';

export const PonchadaSchema = mysqlTable('ponchadas', {
  id: int().autoincrement().primaryKey(),
  fecha: date().notNull(),
  usuario_id: int().references(() => UsuarioSchema.id),
});
