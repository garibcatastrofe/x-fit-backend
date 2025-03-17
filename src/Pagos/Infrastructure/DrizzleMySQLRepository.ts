import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { PagoSchema as pagos } from '@/src/Database/Infrastructure/Drizzle/schemas/PagoSchema';
import { PagoRepository } from '../Domain/Entities/PagoRepository';
import { PagoPrimitive } from '../Domain/Interfaces/PagoPrimitive';
import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { asc, desc, eq } from 'drizzle-orm';

export class PagoMySQLRepository implements PagoRepository {
  public async create(pago: Omit<PagoPrimitive, 'id'>): Promise<void> {
    try {
      await db.insert(pagos).values({
        monto: pago.monto,
        fecha_pago: pago.fecha_pago,
        fecha_vencimiento: pago.fecha_vencimiento,
        membresia_id: pago.membresia_id,
        promocion_id: pago.promocion_id,
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
  }: IQuery<PagoPrimitive>): Promise<PagoPrimitive[]> {
    const pagoall = await db
      .select()
      .from(pagos)
      .orderBy(order === 'asc' ? asc(pagos[orderBy]) : desc(pagos[orderBy]))
      .limit(perPage)
      .offset(page * perPage);
    return pagoall;
  }
  public async getById(id: number): Promise<PagoPrimitive | null> {
    const pago = await db.select().from(pagos).where(eq(pagos.id, id));
    return pago[0] ?? null;
  }

  public async update(id: number, pago: PagoPrimitive): Promise<void> {
    try {
      await db
        .update(pagos)
        .set({
          monto: pago.monto,
          fecha_pago: pago.fecha_pago,
          fecha_vencimiento: pago.fecha_vencimiento,
        })
        .where(eq(pagos.id, id));
    } catch (error) {
      console.error(error);
    }
  }
  public async delete(id: number): Promise<void> {
    try {
      await db.delete(pagos).where(eq(pagos.id, id));
    } catch (error) {
      console.error(error);
    }
  }
}
