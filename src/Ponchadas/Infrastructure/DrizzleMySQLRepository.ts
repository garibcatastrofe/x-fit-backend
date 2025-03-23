import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { PonchadaPrimitive } from '../Domain/Interfaces/PonchadaPrimitive';
import { PonchadaSchema as ponchadas } from '@/src/Database/Infrastructure/Drizzle/schemas/PonchadaSchema';
import { IQuery } from '@/src/Shared/Domain/Interfaces/QueryCompleteSearch';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { asc, desc, eq, count } from 'drizzle-orm';
import { PonchadaRepository } from '../Domain/Entities/PonchadaRepository';
import { UsuarioSchema as usuarios } from '@/src/Database/Infrastructure/Drizzle/schemas/UsuarioSchema';
import { PonchadaWithRelations } from '../Domain/Interfaces/Responses';
import { ClienteSchema as clientes } from '@/src/Database/Infrastructure/Drizzle/schemas/ClienteSchema';
import { PagoClienteSchema as pagos_clientes } from '@/src/Database/Infrastructure/Drizzle/schemas/PagosClientes';
import { PagoSchema as pagos } from '@/src/Database/Infrastructure/Drizzle/schemas/PagoSchema';

export class PonchadaMySQLRepository implements PonchadaRepository {
  public async create(ponchada: Omit<PonchadaPrimitive, 'id'>): Promise<number> {
    try {
      console.warn('PONCHADA: ', ponchada);

      const cliente = await db
        .select()
        .from(clientes)
        .where(eq(clientes.usuario_id, ponchada.usuario_id));
      console.warn('CLIENTE DE LA PONCHADA: ', cliente[0]);

      const pago_cliente = await db
        .select()
        .from(pagos_clientes)
        .where(eq(pagos_clientes.cliente_id, cliente[0].id))
        .orderBy(desc(pagos_clientes.id))
        .limit(1)
      console.warn('PAGO_CLIENTE: ', pago_cliente[0]);

      const pago = await db.select().from(pagos).where(eq(pagos.id, pago_cliente[0].pago_id))
      console.warn("PAGO DEL CLIENTE: ", pago[0])

      const fechaActual = new Date()

      const [year, month, day] = pago[0].fecha_vencimiento.split('-').map(Number);
      const fechaVencimiento = new Date(year, month - 1, day);

      console.warn("FECHA ACTUAL: ", fechaActual)
      console.warn("FECHA VENCIMIENTO: ", fechaVencimiento)

      if(fechaActual <= fechaVencimiento) {
        console.warn("PUEDE PASAR :)")
      } else {
        console.warn("NO PUEDE PASAR")
        return 0
      }

      await db.insert(ponchadas).values({
        fecha: ponchada.fecha,
        usuario_id: ponchada.usuario_id,
      });
      return 1
    } catch (error) {
      console.error(error);
      return -1
    }
  }

  public async getAll({
    page,
    perPage,
    order,
    orderBy,
    eqAtribute,
    atribute,
  }: IQuery<PonchadaPrimitive>): Promise<PaginatedResponse<PonchadaWithRelations>> {
    const whereCondition =
      eqAtribute === 'id'
        ? eq(ponchadas.id, Number(atribute))
        : eqAtribute === 'fecha'
          ? eq(ponchadas.fecha, atribute)
          : eqAtribute === 'usuario_id'
            ? eq(ponchadas.usuario_id, Number(atribute))
            : undefined;
    const rows = await db
      .select({
        usuario: {
          id: usuarios.id,
          nombres: usuarios.nombres,
          apellidos: usuarios.apellidos,
          genero: usuarios.genero,
          fecha_nacimiento: usuarios.fecha_nacimiento,
          correo: usuarios.correo,
          telefono: usuarios.telefono,
          estatus: usuarios.estatus,
        },
        ponchada: ponchadas,
      })
      .from(ponchadas)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined)
      .leftJoin(usuarios, eq(usuarios.id, ponchadas.usuario_id))
      .orderBy(order === 'asc' ? asc(ponchadas[orderBy]) : desc(ponchadas[orderBy]))
      .limit(perPage)
      .offset(page * perPage);

    const ponchadasCount = await db.select({ count: count() }).from(ponchadas);

    return {
      data: rows,
      count: ponchadasCount[0].count,
    };
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
