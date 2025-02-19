import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { PonchadaPrimitive } from '../Domain/Interfaces/PonchadaPrimitive';
import { PonchadaSchema as ponchadas } from '@/src/Database/Infrastructure/Drizzle/schemas/PonchadaSchema';
import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { asc, desc, eq } from 'drizzle-orm';
import { PonchadaRepository } from '../Domain/Entities/PonchadaRepository';

export class PonchadaMySQLRepository implements PonchadaRepository {
  public async create(ponchada: Omit<PonchadaPrimitive, 'id'>): Promise<void> {
    try {
      await db.insert(ponchadas).values({
        fecha: ponchada.fecha,
        usuario_id: ponchada.usuario_id,
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
  }: IQuery<PonchadaPrimitive>): Promise<PonchadaPrimitive[]> {
    const allPonchada = await db
      .select()
      .from(ponchadas)
      .orderBy(order === 'asc' ? asc(ponchadas[orderBy]) : desc(ponchadas[orderBy]))
      .limit(perPage)
      .offset(page * perPage);
    return allPonchada;
  }

  public async getById(id: number): Promise<PonchadaPrimitive> {
    const ponchada = await db.select().from(ponchadas).where(eq(ponchadas.id, id));
    return ponchada[0] ?? null;
  }

  public async update(id: number, ponchada: PonchadaPrimitive): Promise<void> {
    await db
      .update(ponchadas)
      .set({
        fecha: ponchada.fecha,
        usuario_id: ponchada.usuario_id,
      })
      .where(eq(ponchadas.id, id));
  }
  public async delete(id: number): Promise<void> {
    try {
      await db.delete(ponchadas).where(eq(ponchadas.id, id));
    } catch (error) {
      console.error(error);
    }
  }
}
