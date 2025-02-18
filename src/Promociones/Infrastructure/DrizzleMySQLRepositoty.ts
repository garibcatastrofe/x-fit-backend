import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { PromocionSchema as promociones } from '@/src/Database/Infrastructure/Drizzle/schemas/PromocionSchema';
import { PromocionRepository } from '../Domain/Entities/PromocionRepository';
import { PromocionPrimitive } from '../Domain/Interfaces/PromocionPrimitive';
import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { asc, desc, eq } from 'drizzle-orm';

export class PromocionMySQLRepository implements PromocionRepository {
  public async create(promocion: Omit<PromocionPrimitive, 'id'>): Promise<void> {
    try {
      await db.insert(promociones).values({
        nombre: promocion.nombre,
        descuento: promocion.descuento,
        tipo_descuento: promocion.tipo_descuento,
        fecha_inicio: promocion.fecha_inicio,
        fecha_vencimiento: promocion.fecha_vencimiento,
        estatus: promocion.estatus,
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
  }: IQuery<PromocionPrimitive>): Promise<PromocionPrimitive[]> {
    const promocionall = await db
      .select()
      .from(promociones)
      .orderBy(order === 'asc' ? asc(promociones[orderBy]) : desc(promociones[orderBy]))
      .limit(perPage)
      .offset(page * perPage);
    return promocionall;
  }
  public async getById(id: number): Promise<PromocionPrimitive | null> {
    const promocion = await db.select().from(promociones).where(eq(promociones.id, id));
    return promocion[0] ?? null;
  }

  public async update(id: number, promocion: PromocionPrimitive): Promise<void> {
    try {
      await db
        .update(promociones)
        .set({
          nombre: promocion.nombre,
          descuento: promocion.descuento,
          tipo_descuento: promocion.tipo_descuento,
          fecha_inicio: promocion.fecha_inicio,
          fecha_vencimiento: promocion.fecha_vencimiento,
          estatus: promocion.estatus,
        })
        .where(eq(promociones.id, id));
    } catch (error) {
      console.error(error);
    }
  }
  public async delete(id: number): Promise<void> {
    try {
      await db.delete(promociones).where(eq(promociones.id, id));
    } catch (error) {
      console.error(error);
    }
  }
}
