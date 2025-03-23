import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { MembresiaSchema as membresias } from '@/src/Database/Infrastructure/Drizzle/schemas/MembresiaSchema';
import { MembresiaRepository } from '../Domain/Entities/MembresiaRepository';
import { MembresiaPrimitive } from '../Domain/Interfaces/MembresiaPrimitive';
import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { asc, desc, eq } from 'drizzle-orm';

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
  }: IQuery<MembresiaPrimitive>): Promise<MembresiaPrimitive[]> {
    const membresiaall = await db
      .select()
      .from(membresias)
      .orderBy(order === 'asc' ? asc(membresias[orderBy]) : desc(membresias[orderBy]))
      .limit(perPage)
      .offset(page * perPage);
    return membresiaall;
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
