import { AlimentoPrimitive } from '../Domain/Interfaces/AlimentoPrimitive';
import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { AlimentoRepository } from '../Domain/Entities/AlimentoRepository';

export class AlimentoFirebaseRepository implements AlimentoRepository {
  public async create(alimento: Omit<AlimentoPrimitive, 'id'>): Promise<void> {
    try {
      console.warn('Alimento', alimento);
      /* await db.insert(empleados).values({
        puesto: empleado.puesto,
        is_admin: empleado.is_admin,
        usuario_id: empleado.usuario_id,
      }); */
    } catch (error) {
      console.error(error);
    }
  }

  public async getAll({
    page,
    perPage,
    order,
    orderBy,
  }: IQuery<AlimentoPrimitive>): Promise<AlimentoPrimitive[]> {
    /* const allEmpleado = await db
      .select()
      .from(empleados)
      .orderBy(order === 'asc' ? asc(empleados[orderBy]) : desc(empleados[orderBy]))
      .limit(perPage)
      .offset(page * perPage); */
    const allAlimentos: AlimentoPrimitive[] = [
      {
        nombre: 'Manzana',
        clasificacion: 'Uno',
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
        unidad_medicion: 'Ninguna en especial',
      },
    ];
    console.warn(
      `Obteniendo todos los alimentos desde la página ${page}, ${perPage} alimentos por página, en orden ${order}, ordenar por ${orderBy}`,
    );
    return allAlimentos;
  }

  public async getById(id: string): Promise<AlimentoPrimitive> {
    /* const empleado = await db.select().from(empleados).where(eq(empleados.id, id)); */
    const alimento: AlimentoPrimitive[] = [
      {
        id: id,
        nombre: 'Manzanza',
        clasificacion: 'Sin clasificación',
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
        unidad_medicion: 'Sin unidad de medición',
      },
    ];
    return alimento[0] ?? null;
  }

  public async update(id: string, alimento: AlimentoPrimitive): Promise<void> {
    /* await db
      .update(empleados)
      .set({
        puesto: empleado.puesto,
        is_admin: empleado.is_admin,
        usuario_id: empleado.usuario_id,
      })
      .where(eq(empleados.id, id)); */
    console.warn(`Alimento con el id ${id} actualizado correctamente`, alimento);
  }
  public async delete(id: string): Promise<void> {
    try {
      /* await db.delete(empleados).where(eq(empleados.id, id)); */
      console.warn(`Alimento con el id ${id} eliminado correctamente`);
    } catch (error) {
      console.error(error);
    }
  }
}
