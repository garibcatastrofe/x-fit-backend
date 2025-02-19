import { db } from '@/src/Database/Infrastructure/Drizzle/DrizzleMySQLService';
import { ClientePrimitive } from '../Domain/Interfaces/ClientePrimitive';
import { ClienteSchema as clientes } from '@/src/Database/Infrastructure/Drizzle/schemas/ClienteSchema';
import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { asc, desc, eq } from 'drizzle-orm';
import { ClienteRepository } from '../Domain/Entities/ClienteRepository';

export class ClienteMySQLRepository implements ClienteRepository {
  public async create(cliente: Omit<ClientePrimitive, 'id'>): Promise<void> {
    try {
      await db.insert(clientes).values({
        fecha_inicio: cliente.fecha_inicio,
        genero: cliente.genero,
        tipo: cliente.tipo,
        usuario_id: cliente.usuario_id,
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
  }: IQuery<ClientePrimitive>): Promise<ClientePrimitive[]> {
    const allCliente = await db
      .select()
      .from(clientes)
      .orderBy(order === 'asc' ? asc(clientes[orderBy]) : desc(clientes[orderBy]))
      .limit(perPage)
      .offset(page * perPage);
    return allCliente;
  }

  public async getById(id: number): Promise<ClientePrimitive> {
    const cliente = await db.select().from(clientes).where(eq(clientes.id, id));
    return cliente[0] ?? null;
  }

  public async update(id: number, cliente: ClientePrimitive): Promise<void> {
    await db
      .update(clientes)
      .set({
        fecha_inicio: cliente.fecha_inicio,
        genero: cliente.genero,
        tipo: cliente.tipo,
        usuario_id: cliente.usuario_id,
      })
      .where(eq(clientes.id, id));
  }
  public async delete(id: number): Promise<void> {
    try {
      await db.delete(clientes).where(eq(clientes.id, id));
    } catch (error) {
      console.error(error);
    }
  }
}
