import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { PromocionSchema as promociones } from '@/src/Database/Infrastructure/Drizzle/schemas/PromocionSchema';
import { PromocionRepository } from '../Domain/Entities/PromocionRepository';
import { PromocionPrimitive } from '../Domain/Interfaces/PromocionPrimitive';
import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { asc, desc, eq, count } from 'drizzle-orm';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { PromocionWithRelations } from '../Domain/Interfaces/Responses';

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
        descripcion: promocion.descripcion,
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
  }: IQuery<PromocionPrimitive>): Promise<PaginatedResponse<PromocionWithRelations>> {
    const whereCondition =
      eqAtribute === 'id'
        ? eq(promociones.id, Number(atribute))
        : eqAtribute === 'nombre'
          ? eq(promociones.nombre, atribute)
          : eqAtribute === 'descuento'
            ? eq(promociones.descuento, Number(atribute))
            : eqAtribute === 'tipo_descuento'
              ? eq(promociones.tipo_descuento, atribute)
              : eqAtribute === 'fecha_inicio'
                ? eq(promociones.fecha_inicio, atribute)
                : eqAtribute === 'fecha_vencimiento'
                  ? eq(promociones.fecha_vencimiento, atribute)
                  : eqAtribute === 'estatus'
                    ? eq(promociones.estatus, atribute)
                    : eqAtribute === 'descripcion'
                      ? eq(promociones.descripcion, atribute)
                      : undefined;

    const promocionesAll = await db
      .select({
        promocion: {
          id: promociones.id,
          nombre: promociones.nombre,
          descuento: promociones.descuento,
          tipo_descuento: promociones.tipo_descuento,
          fecha_inicio: promociones.fecha_inicio,
          fecha_vencimiento: promociones.fecha_vencimiento,
          estatus: promociones.estatus,
          descripcion: promociones.descripcion,
        },
      })
      .from(promociones)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined)
      .orderBy(order === 'asc' ? asc(promociones[orderBy]) : desc(promociones[orderBy]))
      .limit(perPage)
      .offset(page * perPage);

    const promocionesCount = await db
      .select({ count: count() })
      .from(promociones)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined);

    return {
      data: promocionesAll,
      count: promocionesCount[0].count,
    };
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
          descripcion: promocion.descripcion,
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
