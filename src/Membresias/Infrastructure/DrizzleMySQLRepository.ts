import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { MembresiaSchema as membresias } from '@/src/Database/Infrastructure/Drizzle/schemas/MembresiaSchema';
import { MembresiaRepository } from '../Domain/Entities/MembresiaRepository';
import { MembresiaPrimitive } from '../Domain/Interfaces/MembresiaPrimitive';
import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { asc, desc, eq, count } from 'drizzle-orm';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { MembresiaWithRelations } from '../Domain/Interfaces/Responses';

export class MembresiaMySQLRepository implements MembresiaRepository {
  public async create(membresia: Omit<MembresiaPrimitive, 'id'>): Promise<void> {
    try {
      await db.insert(membresias).values({
        nombre: membresia.nombre,
        precio: membresia.precio,
        duracion_meses: membresia.duracion_meses,
        descripcion: membresia.descripcion,
        tipo: membresia.tipo,
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
  }: IQuery<MembresiaPrimitive>): Promise<PaginatedResponse<MembresiaWithRelations>> {
    const whereCondition =
      eqAtribute === 'id'
        ? eq(membresias.id, Number(atribute))
        : eqAtribute === 'nombre'
          ? eq(membresias.nombre, atribute)
          : eqAtribute === 'duracion_meses'
            ? eq(membresias.duracion_meses, Number(atribute))
            : eqAtribute === 'precio'
              ? eq(membresias.precio, Number(atribute))
              : eqAtribute === 'descripcion'
                ? eq(membresias.descripcion, atribute)
                : eqAtribute === 'tipo'
                  ? eq(membresias.tipo, atribute)
                  : undefined;
    const membresiaall = await db
      .select({
        membresia: {
          id: membresias.id,
          nombre: membresias.nombre,
          precio: membresias.precio,
          duracion_meses: membresias.duracion_meses,
          descripcion: membresias.descripcion,
          tipo: membresias.tipo,
        },
      })
      .from(membresias)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined)
      .orderBy(order === 'asc' ? asc(membresias[orderBy]) : desc(membresias[orderBy]))
      .limit(perPage)
      .offset(page * perPage);

    const membresiasCount = await db
      .select({ count: count() })
      .from(membresias)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined);
    return {
      data: membresiaall,
      count: membresiasCount[0].count,
    };
  }
  public async getById(id: number): Promise<MembresiaPrimitive | null> {
    const membresia = await db.select().from(membresias).where(eq(membresias.id, id));
    return membresia[0] ?? null;
  }

  public async update(id: number, membresia: MembresiaPrimitive): Promise<void> {
    try {
      await db
        .update(membresias)
        .set({
          nombre: membresia.nombre,
          precio: membresia.precio,
          duracion_meses: membresia.duracion_meses,
          descripcion: membresia.descripcion,
          tipo: membresia.tipo,
        })
        .where(eq(membresias.id, id));
    } catch (error) {
      console.error(error);
    }
  }
  public async delete(id: number): Promise<void> {
    try {
      await db.delete(membresias).where(eq(membresias.id, id));
    } catch (error) {
      console.error(error);
    }
  }
}
