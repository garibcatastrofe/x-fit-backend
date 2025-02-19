import { mysqlTable, varchar, int, timestamp, date } from 'drizzle-orm/mysql-core';
export const UsuarioSchema = mysqlTable('usuarios', {
  id: int().autoincrement().primaryKey(),
  nombres: varchar({ length: 50 }).notNull(),
  apellidos: varchar({ length: 50 }).notNull(),
  fecha_nacimiento: varchar({ length: 19 }).notNull(),
  correo: varchar({ length: 100 }).notNull(),
  password: varchar({ length: 50 }).notNull(),
  telefono: varchar({ length: 12 }).notNull(),
  estatus: varchar({ length: 20 }).notNull(),
});
