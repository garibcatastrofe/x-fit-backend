import { mysqlTable, int } from 'drizzle-orm/mysql-core';
import { ClienteSchema } from './ClienteSchema';

export const DietaSchema = mysqlTable('dietas', {
  id: int().autoincrement().primaryKey(),
  cliente_id: int().references(() => ClienteSchema.id),
});
