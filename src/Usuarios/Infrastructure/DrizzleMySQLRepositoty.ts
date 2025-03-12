import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { UsuarioSchema as usuarios } from '@/src/Database/Infrastructure/Drizzle/schemas/UsuarioSchema';
import { UsuarioPrimitive } from '../Domain/Interfaces/UsuarioPrimitive';
import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { asc, desc, eq, and } from 'drizzle-orm';
import { UsuarioRepository } from '../Domain/Entities/UsuarioRepository';

export class UsuarioMySQLRepository implements UsuarioRepository {
  public async create(usuario: Omit<UsuarioPrimitive, 'id'>): Promise<void> {
    try {
      await db.insert(usuarios).values({
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        fecha_nacimiento: usuario.fecha_nacimiento,
        correo: usuario.correo,
        password: usuario.password == null ? '' : usuario.password,
        telefono: usuario.telefono,
        estatus: usuario.estatus,
      });
    } catch (error) {
      console.error(error);
    }
  }
  public async getAll({
    page,
    perPage,
    order,
    orderBy,
  }: IQuery<UsuarioPrimitive>): Promise<UsuarioPrimitive[]> {
    const usuarioall = await db
      .select()
      .from(usuarios)
      .orderBy(order === 'asc' ? asc(usuarios[orderBy]) : desc(usuarios[orderBy]))
      .limit(perPage)
      .offset(page * perPage);
    return usuarioall;
  }

  public async getById(id: number): Promise<UsuarioPrimitive | null> {
    const usuario = await db
      .select({
        id: usuarios.id,
        nombres: usuarios.nombres,
        apellidos: usuarios.apellidos,
        fecha_nacimiento: usuarios.fecha_nacimiento,
        correo: usuarios.correo,
        telefono: usuarios.telefono,
        estatus: usuarios.estatus,
      })
      .from(usuarios)
      .where(eq(usuarios.id, id));
    return usuario[0] ?? null;
  }

  public async login(correo: string, password: string): Promise<UsuarioPrimitive[]> {
    const usuario = await db
      .select()
      .from(usuarios)
      .where(and(eq(usuarios.correo, correo), eq(usuarios.password, password)));

    console.warn(correo);
    console.warn(password);
    console.warn(usuario);

    return usuario ?? null;
  }

  public async update(id: number, usuario: UsuarioPrimitive): Promise<void> {
    try {
      await db
        .update(usuarios)
        .set({
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          fecha_nacimiento: usuario.fecha_nacimiento,
          correo: usuario.correo,
          password: usuario.password,
          telefono: usuario.telefono,
          estatus: usuario.estatus,
        })
        .where(eq(usuarios.id, id));
    } catch (error) {
      console.error(error);
    }
  }
  public async delete(id: number): Promise<void> {
    try {
      await db.delete(usuarios).where(eq(usuarios.id, id));
    } catch (error) {
      console.error(error);
    }
  }
  public async verify(): Promise<void> {}
  public async logout(): Promise<void> {}
}
