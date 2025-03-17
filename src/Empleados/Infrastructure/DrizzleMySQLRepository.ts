import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { EmpleadoPrimitive } from '../Domain/Interfaces/EmpleadoPrimitive';
import { EmpleadoSchema as empleados } from '@/src/Database/Infrastructure/Drizzle/schemas/EmpleadoSchema';
import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { asc, desc, eq, count } from 'drizzle-orm';
import { EmpleadoRepository } from '../Domain/Entities/EmpleadoRepository';
import { UsuarioSchema as usuarios } from '@/src/Database/Infrastructure/Drizzle/schemas/UsuarioSchema';
import { UsuarioPrimitive } from '../../Usuarios/Domain/Interfaces/UsuarioPrimitive';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { EmpleadoWithRelations } from '../Domain/Interfaces/Responses';

export class EmpleadoMySQLRepository implements EmpleadoRepository {
  public async create(empleado: Omit<EmpleadoPrimitive, 'id'>): Promise<void> {
    try {
      await db.insert(empleados).values({
        puesto: empleado.puesto,
        is_admin: empleado.is_admin,
        usuario_id: empleado.usuario_id,
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
  }: IQuery<EmpleadoPrimitive | UsuarioPrimitive>): Promise<
    PaginatedResponse<EmpleadoWithRelations>
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
                        : eqAtribute === 'puesto'
                          ? eq(empleados.puesto, atribute)
                          : eqAtribute === 'is_admin'
                            ? eq(empleados.is_admin, atribute)
                            : eqAtribute === 'usuario_id'
                              ? eq(empleados.usuario_id, Number(atribute))
                              : undefined;
    const rows = await db
      .select({
        empleado: empleados,
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
      .from(empleados)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined)
      .leftJoin(usuarios, eq(empleados.usuario_id, usuarios.id))
      .orderBy(
        order === 'asc'
          ? orderBy in empleados
            ? asc(empleados[orderBy as keyof EmpleadoPrimitive])
            : asc(usuarios[orderBy as keyof UsuarioPrimitive])
          : orderBy in empleados
            ? desc(empleados[orderBy as keyof EmpleadoPrimitive])
            : desc(usuarios[orderBy as keyof UsuarioPrimitive]),
      )
      .limit(perPage)
      .offset(page * perPage);

    const empleadosCount = await db
      .select({ count: count() })
      .from(empleados)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined)
      .leftJoin(usuarios, eq(empleados.usuario_id, usuarios.id));
    return {
      data: rows,
      count: empleadosCount[0].count,
    };
  }

  public async getById(id: number): Promise<EmpleadoPrimitive> {
    const empleado = await db.select().from(empleados).where(eq(empleados.id, id));
    return empleado[0] ?? null;
  }

  public async update(id: number, empleado: EmpleadoPrimitive): Promise<void> {
    console.warn('Empleado nuevo: ', empleado);
    await db
      .update(empleados)
      .set({
        puesto: empleado.puesto,
        is_admin: empleado.is_admin,
        usuario_id: empleado.usuario_id,
      })
      .where(eq(empleados.id, id));
  }
  public async delete(id: number): Promise<void> {
    try {
      await db.delete(empleados).where(eq(empleados.id, id));
    } catch (error) {
      console.error(error);
    }
  }
}
