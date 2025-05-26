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
import { EmpleadoSchema as empleados } from '@/src/Database/Infrastructure/Drizzle/schemas/EmpleadoSchema';

async function agregarPonchada({ ponchada }: { ponchada: PonchadaPrimitive }): Promise<number> {
  /* console.warn('----------------------------------------------------------');
  console.warn('EMPEZANDO LA CREACIÓN DE UNA NUEVA PONCHADA PARA EL CLIENTE!'); */
  //En este método se muestra el procedimiento para crear una ponchada

  //Primero se busca al cliente del usuario proporcionado en el objeto ponchada
  const cliente = await db
    .select()
    .from(clientes)
    .where(eq(clientes.usuario_id, ponchada.usuario_id))
    .limit(1);
  //console.warn('CLIENTE DE LA PONCHADA: ', cliente[0]);

  const cliConsulta = cliente[0];

  if (cliConsulta === undefined) {
    //console.warn('EL CLIENTE DE ESE USUARIO NO EXISTE, INTENTE CON OTRO USUARIO');
    return -2;
  } else {
    //Si el cliente del usuario si existe, que debería de ser en el 99.99% de los casos, se verifica su última relación en la tabla pagos_clientes, que podría ser undefined, ya que podría ser alguien nuevo sin ningún pago.
    const pago_cliente = await db
      .select()
      .from(pagos_clientes)
      .where(eq(pagos_clientes.cliente_id, cliConsulta.id))
      .orderBy(desc(pagos_clientes.id))
      .limit(1);
    //console.warn('PAGO_CLIENTE: ', pago_cliente[0]);

    const consultaPagoCliente = pago_cliente[0];

    if (consultaPagoCliente === undefined) {
      /* console.warn(
        'EL CLIENTE QUE USTED SOLICITO NO TIENE NINGUN PAGO REGISTRADO, PORFAVOR REGISTRE SU PAGO E INTENTE NUEVAMENTE MÁS TARDE',
      ); */
      return -3;
    } else {
      //Si existe esa relación, quiere decir que existe el pago, por lo tanto nuevamente buscamos el último pago que haya realizado el cliente, que siempre deberá de existir ya que pasó la condición anterior, sin embargo, se hace una comprobación por seguridad.
      const pago = await db.select().from(pagos).where(eq(pagos.id, consultaPagoCliente.pago_id));
      //console.warn('PAGO DEL CLIENTE: ', pago[0]);

      const consultaPago = pago[0];

      if (consultaPago === undefined) {
        /* console.warn(
          'EL CLIENTE QUE USTED SOLICITO NO TIENE NINGUN PAGO REGISTRADO, PORFAVOR REGISTRE SU PAGO E INTENTE NUEVAMENTE MÁS TARDE',
        ); */
        return -4;
      } else {
        const fechaActual = new Date();

        const [year, month, day] = pago[0].fecha_vencimiento.split('-').map(Number);
        const fechaVencimiento = new Date(year, month - 1, day);

        /* console.warn('FECHA ACTUAL: ', fechaActual);
        console.warn('FECHA VENCIMIENTO: ', fechaVencimiento); */

        if (fechaActual <= fechaVencimiento) {
          //console.warn('PUEDE PASAR :)');
        } else {
          //console.warn('NO PUEDE PASAR :(');
          return 0;
        }

        await db.insert(ponchadas).values({
          fecha: ponchada.fecha,
          usuario_id: ponchada.usuario_id,
        });
        //console.warn('----------------------------------------------------------');
        return 1;
      }
    }
  }
}

function esMismoDia(fecha1Str: string, fecha2Str: string): boolean {
  // Extraemos solo YYYY-MM-DD y convertimos a Date
  const fecha1 = new Date(fecha1Str.split(' ')[0]);
  const fecha2 = new Date(fecha2Str.split(' ')[0]);

  // Comparación de Año, Mes y Día
  return (
    fecha1.getFullYear() === fecha2.getFullYear() &&
    fecha1.getMonth() === fecha2.getMonth() &&
    fecha1.getDate() === fecha2.getDate()
  );
}

export class PonchadaMySQLRepository implements PonchadaRepository {
  public async create(ponchada: Omit<PonchadaPrimitive, 'id'>): Promise<number> {
    try {
      /* console.warn('----------------------------------------------------------');
      console.warn('INICIANDO CREAR PONCHADA');
      console.warn('PONCHADA: ', ponchada); */

      const usuario = await db
        .select()
        .from(usuarios)
        .where(eq(usuarios.id, ponchada.usuario_id))
        .limit(1);

      if (usuario.length === 0) {
        return -5;
      } else {
        const user = usuario[0];

        if (user.estatus !== 'ACTIVO') {
          return -6;
        }
      }

      const empleado = await db
        .select()
        .from(empleados)
        .where(eq(empleados.usuario_id, ponchada.usuario_id))
        .limit(1);

      if (empleado.length === 0) {
        //Si dió 0, quiere decir que no es un empleado, si no un cliente, se procede a buscar la ultima ponchada de el usuario por el que se intenta buscar
        const ultimaPonchadaUsuario = await db
          .select()
          .from(ponchadas)
          .where(eq(ponchadas.usuario_id, ponchada.usuario_id))
          .orderBy(desc(ponchadas.id))
          .limit(1);

        const ultimaPonchada = ultimaPonchadaUsuario[0];

        //console.warn('ULTIMA PONCHADA DEL CLIENTE: ', ultimaPonchada);

        //Este cliente podría no tener ninguna ponchada, por eso da undefined, de ser ese caso simplemente creamos una
        if (ultimaPonchada === undefined) {
          //console.warn('EL CLIENTE NO TIENE PONCHADAS, SE PROCEDE A AGREGAR UNA!');
          return agregarPonchada({ ponchada: ponchada });
        } else {
          //Si el cliente si tiene una última ponchada, verificamos que no haya ponchado ya el día de hoy, ya  que podría darle su código qr a otra persona e intentar entrar varias veces gratis!!
          const fechaUltimaPonchada = ultimaPonchada.fecha;
          const fechaPonchada = ponchada.fecha;

          /* console.warn(
            'EL CLIENTE TIENE PONCHADAS, SE PROCEDE A VERIFICAR QUE NO HAYA PONCHADO YA HOY!',
          );
          console.warn('FECHA ULTIMA PONCHADA: ', fechaUltimaPonchada);
          console.warn('FECHA PONCHADA RECIBIDA: ', fechaPonchada); */

          //esMismoDia es una función que nos verifica si ambas fechas mandadas son iguales o no, sin contar la hora
          if (esMismoDia(fechaUltimaPonchada, fechaPonchada)) {
            //console.warn('Ya has ponchado hoy, no puedes volver a ponchar :(');
            return 2;
          } else {
            //console.warn('Puedes ponchar.');
            return agregarPonchada({ ponchada: ponchada });
          }
        }
      } else {
        //console.warn('----------------------------------------------------------');
        //console.warn('EMPEZANDO LA CREACIÓN DE UNA NUEVA PONCHADA PARA EL EMPLEADO!');
        await db.insert(ponchadas).values({
          fecha: ponchada.fecha,
          usuario_id: ponchada.usuario_id,
        });
        //console.warn('----------------------------------------------------------');
        return 1;
      }
    } catch (error) {
      console.error(error);
      return -1;
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

    const ponchadasCount = await db
      .select({ count: count() })
      .from(ponchadas)
      .where(atribute !== '0' && whereCondition ? whereCondition : undefined);

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
