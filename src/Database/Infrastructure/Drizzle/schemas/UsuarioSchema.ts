import { mysqlTable, varchar, int, date } from 'drizzle-orm/mysql-core';
export const UsuarioSchema = mysqlTable('usuarios', {
  id: int().autoincrement().primaryKey(),
  nombres: varchar({ length: 50 }).notNull(),
  apellidos: varchar({ length: 50 }).notNull(),
  fecha_nacimiento: date().notNull(),
  correo: varchar({ length: 100 }).notNull(),
  password: varchar({ length: 50 }).notNull(),
  telefono: varchar({ length: 12 }).notNull(),
  estatus: varchar({ length: 20 }).notNull(),
});
