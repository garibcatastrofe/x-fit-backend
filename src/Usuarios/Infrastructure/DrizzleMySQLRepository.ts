import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { UsuarioSchema as usuarios } from '@/src/Database/Infrastructure/Drizzle/schemas/UsuarioSchema';
import { UsuarioPrimitive } from '../Domain/Interfaces/UsuarioPrimitive';
import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { asc, desc, eq, count } from 'drizzle-orm';
import { UsuarioRepository } from '../Domain/Entities/UsuarioRepository';
import { PaginatedResponseUsuarios } from '@/src/Shared/Domain/Interfaces/Responses';
import { UsuarioWithRelations } from '../Domain/Interfaces/Responses';
import { EmpleadoSchema as empleados } from '@/src/Database/Infrastructure/Drizzle/schemas/EmpleadoSchema';
import { ClienteSchema as clientes } from '@/src/Database/Infrastructure/Drizzle/schemas/ClienteSchema';
import bcrypt from 'bcrypt';

export class UsuarioMySQLRepository implements UsuarioRepository {
  public async create(usuario: Omit<UsuarioPrimitive, 'id'>): Promise<void> {
    try {
      await db.insert(usuarios).values({
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        genero: usuario.genero,
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
    eqAtribute,
    atribute,
  }: IQuery<UsuarioPrimitive>): Promise<PaginatedResponseUsuarios<UsuarioWithRelations>> {
    const whereCondition =
      eqAtribute === 'id'
        ? eq(usuarios.id, Number(atribute))
        : eqAtribute === 'nombres'
          ? eq(usuarios.nombres, atribute)
          : eqAtribute === 'apellidos'
            ? eq(usuarios.apellidos, atribute)
            : eqAtribute === 'correo'
              ? eq(usuarios.correo, atribute)
              : eqAtribute === 'password'
                ? eq(usuarios.password, atribute)
                : eqAtribute === 'estatus'
                  ? eq(usuarios.estatus, atribute)
                  : eqAtribute === 'fecha_nacimiento'
                    ? eq(usuarios.fecha_nacimiento, atribute)
                    : eqAtribute === 'genero'
                      ? eq(usuarios.genero, atribute)
                      : eqAtribute === 'telefono'
                        ? eq(usuarios.telefono, atribute)
                        : undefined;
    const rows = await db
      .select({
        usuario: {
          id: usuarios.id,
          nombres: usuarios.nombres,
          apellidos: usuarios.apellidos,
          genero: usuarios.genero,
          fecha_nacimiento: usuarios.fecha_nacimiento,
          correo: usuarios.correo,
          telefono: usuarios.telefono,
          estatus: usuarios.estatus,
        },
        empleado: empleados,
        cliente: clientes,
      })
      .from(usuarios)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined)
      .leftJoin(empleados, eq(empleados.usuario_id, usuarios.id))
      .leftJoin(clientes, eq(clientes.usuario_id, usuarios.id))
      .orderBy(order === 'asc' ? asc(usuarios[orderBy]) : desc(usuarios[orderBy]))
      .limit(perPage)
      .offset(page * perPage);

    const usuariosCount = await db.select({ count: count() }).from(usuarios);
    const empleadosCount = await db.select({ count: count() }).from(empleados);
    const clientesCount = await db.select({ count: count() }).from(clientes);

    return {
      data: rows,
      countUsuarios: usuariosCount[0].count,
      countEmpleados: empleadosCount[0].count,
      countClientes: clientesCount[0].count,
    };
  }

  public async getById(id: number): Promise<UsuarioPrimitive | null> {
    const usuario = await db
      .select({
        id: usuarios.id,
        nombres: usuarios.nombres,
        apellidos: usuarios.apellidos,
        genero: usuarios.genero,
        fecha_nacimiento: usuarios.fecha_nacimiento,
        correo: usuarios.correo,
        telefono: usuarios.telefono,
        estatus: usuarios.estatus,
      })
      .from(usuarios)
      .where(eq(usuarios.id, id));
    return usuario[0] ?? null;
  }

  public async login(correo: string, password: string): Promise<UsuarioPrimitive | null> {
    // Buscar usuario por correo
    const usuario = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.correo, correo))
      .then(rows => rows[0]); // Obtener el primer usuario encontrado

    // Si el usuario no existe, retornar null
    if (!usuario) {
      return null
    };

    // Comparar la contraseña ingresada con la guardada en la base de datos
    const passwordMatch = await bcrypt.compare(password, usuario.password);

    // Si la contraseña no coincide, retornar null
    if (!passwordMatch) {
      return null;
    }

    // Retornar el usuario si la contraseña es correcta
    return usuario;
  }

  public async update(id: number, usuario: UsuarioPrimitive): Promise<void> {
    try {
      const hashedPassword = bcrypt.hashSync(
        usuario.password == null ? '12345' : usuario.password,
        10,
      );

      await db
        .update(usuarios)
        .set({
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          genero: usuario.genero,
          fecha_nacimiento: usuario.fecha_nacimiento,
          correo: usuario.correo,
          password: hashedPassword,
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
