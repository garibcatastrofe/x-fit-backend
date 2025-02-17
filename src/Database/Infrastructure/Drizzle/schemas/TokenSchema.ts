import { mysqlTable, int, date, varchar } from 'drizzle-orm/mysql-core';
import { UsuarioSchema } from './UsuarioSchema';

export const TokenSchema = mysqlTable('tokens', {
  id: int().autoincrement().primaryKey(),
  token: varchar({ length: 50 }).notNull(),
  expiracion: date().notNull(),
  usuario_id: int().references(() => UsuarioSchema.id),
});
