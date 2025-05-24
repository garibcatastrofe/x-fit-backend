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
import { PagoClienteSchema as pagos_clientes } from '@/src/Database/Infrastructure/Drizzle/schemas/PagosClientes';
import { PagoSchema as pagos } from '@/src/Database/Infrastructure/Drizzle/schemas/PagoSchema';
import bcrypt from 'bcryptjs';

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
      return null;
    }

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
      // Obtener el id del cliente asociado al usuario
      const cliente = await db
        .select({ id: clientes.id })
        .from(clientes)
        .where(eq(clientes.usuario_id, id))
        .limit(1);

      if (cliente.length === 0) {
        console.warn(`No se encontró cliente asociado al usuario con ID ${id}`);
        return;
      }

      const clienteId = cliente[0].id;

      // Obtener los IDs de los pagos asociados al cliente
      const pagosIds = await db
        .select({ pago_id: pagos_clientes.pago_id })
        .from(pagos_clientes)
        .where(eq(pagos_clientes.cliente_id, clienteId));

      // Eliminar los registros en pagos_clientes
      await db.delete(pagos_clientes).where(eq(pagos_clientes.cliente_id, clienteId));

      // Eliminar el cliente (lo cual debe suceder antes que el usuario)
      await db.delete(clientes).where(eq(clientes.id, clienteId));

      await db.delete(usuarios).where(eq(usuarios.id, id));

      if (pagosIds.length > 0) {
        for (const pago of pagosIds) {
          await db.delete(pagos).where(eq(pagos.id, pago.pago_id));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  public async verify(): Promise<void> {}
  public async logout(): Promise<void> {}
}
