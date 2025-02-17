import express, { Request, Response } from "express"

import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { UsuarioSchema } from './Database/Infrastructure/Drizzle/schemas/UsuarioSchema';
import { db } from './Database/Infrastructure/Drizzle/DrizzleMySQLService'

const app = express()

async function main() {
  const user: typeof UsuarioSchema.$inferInsert = {
    id: 1,
    nombres: "Pirita",
    apellidos: "Dreemmur",
    correo: "pirita@gmail.com",
    fechaNacimiento: new Date(),
    password: "123",
    telefono: "6311937513",
    estatus: "ACTIVO"
  };
  await db.insert(UsuarioSchema).values(user);
  console.log('New user created!')
  const users = await db.select().from(UsuarioSchema);
  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */
  await db
    .update(UsuarioSchema)
    .set({
      telefono: "6311322270",
    })
    .where(eq(UsuarioSchema.telefono, user.telefono));
  console.log('User info updated!')
  /* await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!') */
}
main();

app.get("/", (req: Request, res: Response) => {
  res.send("hola mundo")
})

app.listen(2000, () => {
  console.log("Listen on http://localhost:2000")
})