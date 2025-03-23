import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { PagoClienteSchema as pagos_clientes } from '@/src/Database/Infrastructure/Drizzle/schemas/PagosClientes';
import { PagoClienteRepository } from '../Domain/Entities/PagoClienteRepository';
import { PagoClientePrimitive } from '../Domain/Interfaces/PagoClientePrimitive';
import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { PagoClienteWithRelations } from '../Domain/Interfaces/Responses';
import { asc, desc, eq, count } from 'drizzle-orm';
import { ClienteSchema as clientes } from '@/src/Database/Infrastructure/Drizzle/schemas/ClienteSchema';
import { UsuarioSchema as usuarios } from '@/src/Database/Infrastructure/Drizzle/schemas/UsuarioSchema';

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
    eqAtribute,
    atribute,
  }: IQuery<PagoClientePrimitive>): Promise<PaginatedResponse<PagoClienteWithRelations>> {
    const whereCondition =
      eqAtribute === 'id'
        ? eq(pagos_clientes.id, Number(atribute))
        : eqAtribute === 'pago_id'
          ? eq(pagos_clientes.pago_id, Number(atribute))
          : eqAtribute === 'cliente_id'
            ? eq(pagos_clientes.cliente_id, Number(atribute))
            : undefined;

    const pagoClienteAll = await db
      .select({
        id: pagos_clientes.id,
        cliente_id: pagos_clientes.cliente_id,
        pago_id: pagos_clientes.pago_id,
        usuario_id: usuarios.id,
        nombres: usuarios.nombres,
        apellidos: usuarios.apellidos,
      })
      .from(pagos_clientes)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined)
      .leftJoin(clientes, eq(pagos_clientes.cliente_id, clientes.id))
      .leftJoin(usuarios, eq(clientes.usuario_id, usuarios.id))
      .orderBy(order === 'asc' ? asc(pagos_clientes[orderBy]) : desc(pagos_clientes[orderBy]))
      .limit(perPage)
      .offset(page * perPage);

    const pagosClientesCount = await db
      .select({ count: count() })
      .from(pagos_clientes)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined);

    return {
      data: pagoClienteAll,
      count: pagosClientesCount[0].count,
    };
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
