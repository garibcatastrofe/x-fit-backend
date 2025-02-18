import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { EmpleadoPrimitive } from '../Domain/Interfaces/EmpleadoPrimitive';
import { EmpleadoSchema as empleados } from '@/src/Database/Infrastructure/Drizzle/schemas/EmpleadoSchema';
import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { asc, desc, eq } from 'drizzle-orm';
import { EmpleadoRepository } from '../Domain/Entities/EmpleadoRepository';

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
  }: IQuery<EmpleadoPrimitive>): Promise<EmpleadoPrimitive[]> {
    const allEmpleado = await db
      .select()
      .from(empleados)
      .orderBy(order === 'asc' ? asc(empleados[orderBy]) : desc(empleados[orderBy]))
      .limit(perPage)
      .offset(page * perPage);
    return allEmpleado;
  }

  public async getById(id: number): Promise<EmpleadoPrimitive> {
    const prestacionSolicitud = await db
      .select()
      .from(empleados)
      .where(eq(empleados.id, id))
      .limit(1);

    if (!prestacionSolicitud[0]) {
      throw new Error(`Empleado con id ${id} no encontrado`);
    }

    return prestacionSolicitud[0];
  }

  public async update(id: number, empleado: EmpleadoPrimitive): Promise<void> {
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
