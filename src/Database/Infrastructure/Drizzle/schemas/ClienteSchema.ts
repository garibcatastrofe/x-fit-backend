import { mysqlTable, int, mysqlEnum, date } from 'drizzle-orm/mysql-core';
import { UsuarioSchema } from './UsuarioSchema';

export const ClienteSchema = mysqlTable('clientes', {
  id: int().autoincrement().primaryKey(),
  fechaInicio: date().notNull(),
  genero: mysqlEnum(['M', 'F']).notNull(),
  tipo: mysqlEnum(['NORMAL', 'PERSONALIZADO']).default('NORMAL'),
  usuario_id: int().references(() => UsuarioSchema.id),
});
