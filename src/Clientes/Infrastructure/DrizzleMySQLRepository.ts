import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { ClientePrimitive } from '../Domain/Interfaces/ClientePrimitive';
import { ClienteSchema as clientes } from '@/src/Database/Infrastructure/Drizzle/schemas/ClienteSchema';
import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { asc, desc, eq, count } from 'drizzle-orm';
import { ClienteRepository } from '../Domain/Entities/ClienteRepository';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { ClienteWithRelations } from '../Domain/Interfaces/Responses';
import { UsuarioSchema as usuarios } from '@/src/Database/Infrastructure/Drizzle/schemas/UsuarioSchema';
import { UsuarioPrimitive } from '../../Usuarios/Domain/Interfaces/UsuarioPrimitive';

export class ClienteMySQLRepository implements ClienteRepository {
  public async create(cliente: Omit<ClientePrimitive, 'id'>): Promise<void> {
    try {
      await db.insert(clientes).values({
        fecha_inicio: cliente.fecha_inicio,
        tipo: cliente.tipo,
        usuario_id: cliente.usuario_id,
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
  }: IQuery<ClientePrimitive | UsuarioPrimitive>): Promise<
    PaginatedResponse<ClienteWithRelations>
  > {
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
                        : eqAtribute === 'fecha_inicio'
                          ? eq(clientes.fecha_inicio, atribute)
                          : eqAtribute === 'tipo'
                            ? eq(clientes.tipo, atribute)
                            : undefined;
    const rows = await db
      .select({
        cliente: clientes,
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
      })
      .from(clientes)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined)
      .leftJoin(usuarios, eq(clientes.usuario_id, usuarios.id))
      .orderBy(
        order === 'asc'
          ? orderBy in clientes
            ? asc(clientes[orderBy as keyof ClientePrimitive])
            : asc(usuarios[orderBy as keyof UsuarioPrimitive])
          : orderBy in clientes
            ? desc(clientes[orderBy as keyof ClientePrimitive])
            : desc(usuarios[orderBy as keyof UsuarioPrimitive]),
      )
      .limit(perPage)
      .offset(page * perPage);

    const clientesCount = await db
      .select({ count: count() })
      .from(clientes)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined)
      .leftJoin(usuarios, eq(clientes.usuario_id, usuarios.id));

    return {
      data: rows,
      count: clientesCount[0].count,
    };
  }

  public async getById(id: number): Promise<ClientePrimitive> {
    const cliente = await db.select().from(clientes).where(eq(clientes.id, id));
    return cliente[0] ?? null;
  }

  public async update(id: number, cliente: ClientePrimitive): Promise<void> {
    await db
      .update(clientes)
      .set({
        fecha_inicio: cliente.fecha_inicio,
        tipo: cliente.tipo,
        usuario_id: cliente.usuario_id,
      })
      .where(eq(clientes.id, id));
  }
  public async delete(id: number): Promise<void> {
    try {
      await db.delete(clientes).where(eq(clientes.id, id));
    } catch (error) {
      console.error(error);
    }
  }
}
