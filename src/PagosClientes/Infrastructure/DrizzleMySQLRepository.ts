import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { PagoClienteSchema as pagos_clientes } from '@/src/Database/Infrastructure/Drizzle/schemas/PagosClientes';
import { PagoClienteRepository } from '../Domain/Entities/PagoClienteRepository';
import { PagoClientePrimitive } from '../Domain/Interfaces/PagoClientePrimitive';
import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { asc, desc, eq } from 'drizzle-orm';

export class PagoClienteMySQLRepository implements PagoClienteRepository {
  public async create(pagoCliente: Omit<PagoClientePrimitive, 'id'>): Promise<void> {
    try {
      await db.insert(pagos_clientes).values({
        cliente_id: pagoCliente.cliente_id,
        pago_id: pagoCliente.pago_id,
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
  }: IQuery<PagoClientePrimitive>): Promise<PagoClientePrimitive[]> {
    const pagoClienteAll = await db
      .select()
      .from(pagos_clientes)
      .orderBy(order === 'asc' ? asc(pagos_clientes[orderBy]) : desc(pagos_clientes[orderBy]))
      .limit(perPage)
      .offset(page * perPage);
    return pagoClienteAll;
  }

  public async getById(id: number): Promise<PagoClientePrimitive | null> {
    const pago = await db.select().from(pagos_clientes).where(eq(pagos_clientes.id, id));
    return pago[0] ?? null;
  }

  public async update(id: number, pagoCliente: PagoClientePrimitive): Promise<void> {
    try {
      await db
        .update(pagos_clientes)
        .set({
          cliente_id: pagoCliente.cliente_id,
          pago_id: pagoCliente.pago_id,
        })
        .where(eq(pagos_clientes.id, id));
    } catch (error) {
      console.error(error);
    }
  }
  public async delete(id: number): Promise<void> {
    try {
      await db.delete(pagos_clientes).where(eq(pagos_clientes.id, id));
    } catch (error) {
      console.error(error);
    }
  }
}
