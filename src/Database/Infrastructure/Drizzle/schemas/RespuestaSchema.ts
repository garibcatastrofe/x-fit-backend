import { mysqlTable, int } from 'drizzle-orm/mysql-core';
import { UsuarioSchema } from './UsuarioSchema';

export const RespuestaSchema = mysqlTable('respuestas', {
  id: int().autoincrement().primaryKey(),
  usuario_id: int().references(() => UsuarioSchema.id),
});
