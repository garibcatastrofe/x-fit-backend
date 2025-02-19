import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { CpmpPrimitive } from '../Domain/Interfaces/CpmpPrimitive';
import { ClientePagoMembresiaPromocionSchema as cpmps } from '@/src/Database/Infrastructure/Drizzle/schemas/ClientePagoMembresiaPromocionSchema';
import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { asc, desc, eq } from 'drizzle-orm';
import { CpmpRepository } from '../Domain/Entities/CpmpRepository';

export class CpmpMySQLRepository implements CpmpRepository {
  public async create(cpmp: Omit<CpmpPrimitive, 'id'>): Promise<void> {
    try {
      await db.insert(cpmps).values({
        cliente_id: cpmp.cliente_id,
        pago_id: cpmp.pago_id,
        membresia_id: cpmp.membresia_id,
        promocion_id: cpmp.promocion_id,
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
  }: IQuery<CpmpPrimitive>): Promise<CpmpPrimitive[]> {
    const allCpmp = await db
      .select()
      .from(cpmps)
      .orderBy(order === 'asc' ? asc(cpmps[orderBy]) : desc(cpmps[orderBy]))
      .limit(perPage)
      .offset(page * perPage);
    return allCpmp;
  }

  public async getById(id: number): Promise<CpmpPrimitive> {
    const cpmp = await db.select().from(cpmps).where(eq(cpmps.id, id));
    return cpmp[0] ?? null;
  }

  public async update(id: number, cpmp: CpmpPrimitive): Promise<void> {
    await db
      .update(cpmps)
      .set({
        cliente_id: cpmp.cliente_id,
        pago_id: cpmp.pago_id,
        membresia_id: cpmp.membresia_id,
        promocion_id: cpmp.promocion_id,
      })
      .where(eq(cpmps.id, id));
  }
  public async delete(id: number): Promise<void> {
    try {
      await db.delete(cpmps).where(eq(cpmps.id, id));
    } catch (error) {
      console.error(error);
    }
  }
}
