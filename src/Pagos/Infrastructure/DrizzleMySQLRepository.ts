import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { PagoSchema as pagos } from '@/src/Database/Infrastructure/Drizzle/schemas/PagoSchema';
import { MembresiaSchema as membresias } from '@/src/Database/Infrastructure/Drizzle/schemas/MembresiaSchema';
import { PromocionSchema as promociones } from '@/src/Database/Infrastructure/Drizzle/schemas/PromocionSchema';
import { PagoClienteSchema as pagos_clientes } from '@/src/Database/Infrastructure/Drizzle/schemas/PagosClientes';
import { ClienteSchema as clientes } from '@/src/Database/Infrastructure/Drizzle/schemas/ClienteSchema';
import { UsuarioSchema as usuarios } from '@/src/Database/Infrastructure/Drizzle/schemas/UsuarioSchema';
import { PagoRepository } from '../Domain/Entities/PagoRepository';
import { PagoPrimitive } from '../Domain/Interfaces/PagoPrimitive';
import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { asc, desc, eq, count, sql } from 'drizzle-orm';
import { MembresiaPrimitive } from '@/src/Membresias/Domain/Interfaces/MembresiaPrimitive';
import { PromocionPrimitive } from '@/src/Promociones/Domain/Interfaces/PromocionPrimitive';
import { PagoClientePrimitive } from '@/src/PagosClientes/Domain/Interfaces/PagoClientePrimitive';
import { ClientePrimitive } from '@/src/Clientes/Domain/Interfaces/ClientePrimitive';
import { UsuarioPrimitive } from '@/src/Usuarios/Domain/Interfaces/UsuarioPrimitive';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { PagoWithRelations } from '../Domain/Interfaces/Responses';

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
    eqAtribute,
    atribute,
  }: IQuery<
    | PagoPrimitive
    | MembresiaPrimitive
    | PromocionPrimitive
    | PagoClientePrimitive
    | ClientePrimitive
    | UsuarioPrimitive
  >): Promise<PaginatedResponse<PagoWithRelations>> {
    const whereCondition =
      eqAtribute === 'id'
        ? eq(pagos.id, Number(atribute))
        : eqAtribute === 'monto'
          ? eq(pagos.monto, Number(atribute))
          : eqAtribute === 'fecha_pago'
            ? eq(pagos.fecha_pago, atribute)
            : eqAtribute === 'fecha_vencimiento'
              ? eq(pagos.fecha_vencimiento, atribute)
              : eqAtribute === 'membresia_id'
                ? eq(pagos.membresia_id, Number(atribute))
                : eqAtribute === 'promocion_id'
                  ? eq(pagos.promocion_id, Number(atribute))
                  : eqAtribute === 'cliente_id'
                    ? eq(pagos_clientes.cliente_id, Number(atribute))
                    : undefined;

    const pagoall = await db
      .select({
        id: pagos.id,
        monto: pagos.monto,
        fecha_pago: pagos.fecha_pago,
        fecha_vencimiento: pagos.fecha_vencimiento,
        membresia_id: pagos.membresia_id,
        membresia_nombre: membresias.nombre,
        promocion_id: pagos.promocion_id,
        promocion_nombre: promociones.nombre,
        cliente_nombre: sql`CASE 
          WHEN COUNT(${pagos_clientes.cliente_id}) = 1 
          THEN MAX(${usuarios.nombres}) 
          ELSE '(Pago grupal)' 
        END`.as('cliente_nombre'),
      })
      .from(pagos)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined)
      .leftJoin(membresias, eq(pagos.membresia_id, membresias.id))
      .leftJoin(promociones, eq(pagos.promocion_id, promociones.id))
      .leftJoin(pagos_clientes, eq(pagos.id, pagos_clientes.pago_id))
      .leftJoin(clientes, eq(pagos_clientes.cliente_id, clientes.id))
      .leftJoin(usuarios, eq(clientes.usuario_id, usuarios.id))
      .groupBy(pagos.id, membresias.id, membresias.nombre, promociones.id, promociones.nombre)
      .orderBy(order === 'asc' ? asc(pagos[orderBy]) : desc(pagos[orderBy]))
      .limit(perPage)
      .offset(page * perPage);

    const pagosCount = await db
      .select({ count: count() })
      .from(pagos)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined)
      .leftJoin(membresias, eq(pagos.membresia_id, membresias.id))
      .leftJoin(promociones, eq(pagos.promocion_id, promociones.id))
      .leftJoin(pagos_clientes, eq(pagos.id, pagos_clientes.pago_id))
      .leftJoin(clientes, eq(pagos_clientes.cliente_id, clientes.id))
      .leftJoin(usuarios, eq(clientes.usuario_id, usuarios.id));

    return {
      data: pagoall,
      count: pagosCount[0].count,
    };
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
