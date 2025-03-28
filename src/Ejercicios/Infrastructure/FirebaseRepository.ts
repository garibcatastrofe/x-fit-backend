import { EjercicioPrimitive } from '../Domain/Interfaces/EjercicioPrimitive';
import { EjercicioQuery } from '../Domain/Interfaces/FirebaseQuery';
import { EjercicioRepository } from '../Domain/Entities/EjercicioRepository';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';
import { EjercicioWithRelations } from '../Domain/Interfaces/Responses';

function esEjercicioPrimitive(
  objeto: Partial<EjercicioPrimitive>, // Permitimos objeto parcial para evitar errores con `id`
  conId: boolean,
): objeto is EjercicioPrimitive {
  if (!objeto) return false;

  if (conId && typeof objeto.id !== 'string') return false; // `id` solo es obligatorio si `conId` es `true`

  return (
    typeof objeto.nombre === 'string' &&
    typeof objeto.descripcion === 'string' &&
    typeof objeto.repeticiones === 'string' &&
    typeof objeto.descanso === 'number' &&
    typeof objeto.ejecucion === 'string' &&
    typeof objeto.tempo === 'string' &&
    typeof objeto.grupo_muscular === 'string'
  );
}

export class EjercicioFirebaseRepository implements EjercicioRepository {
  public async create(ejercicio: Omit<EjercicioPrimitive, 'id'>): Promise<void> {
    try {
      const docRef = await firestore.collection('ejercicios').add(ejercicio);
      await docRef.update({ id: docRef.id });
    } catch (error) {
      console.error(error);
    }
  }

  public async getAll({
    ultimoDoc,
    perPage,
    order,
    orderBy,
    direction,
    /* eqAtribute,
    atribute */
  }: EjercicioQuery<EjercicioPrimitive>): Promise<PaginatedResponse<EjercicioWithRelations>> {
    let query = firestore.collection('ejercicios').orderBy(orderBy, order);

    /* console.warn("----------------------------------------------------------------------")
    console.warn("Entrando a select all")
    console.warn("ultimoDoc: ", ultimoDoc)
    console.warn("perPage: ", perPage)
    console.warn("order: ", order)
    console.warn("orderBy: ", orderBy)
    console.warn("direction: ", direction) */

    //PENDIENTE: CREAR INDICES COMPUESTOS PARA LAS CONSULTAS WHERE
    /* console.warn("eqAtribute: ", eqAtribute)
    console.warn("atribute: ", atribute) */

    // Agregar filtro si eqAtribute y atribute están definidos
    /* if (atribute !== "") {
      query = query.where(eqAtribute, "==", atribute);
      console.warn(`Aplicando filtro WHERE: ${eqAtribute} == ${atribute}`);
    } */

    if (esEjercicioPrimitive(ultimoDoc, false)) {
      //console.warn("EL DOCUMENTO QUE LLEGA ES EJERCICIO PRIMITIVE!!!!: ", ultimoDoc)
      const lastDocSnap = await firestore
        .collection('ejercicios')
        .doc(ultimoDoc.id ?? '')
        .get();

      if (!lastDocSnap.exists) {
        throw new BadRequest({
          message: 'El documento de paginación no existe en Firestore.',
          campo: 'Documento de paginación',
          data: 'Documento',
        });
      }

      if (direction === 'next') {
        query = query.startAfter(lastDocSnap);
      } else if (direction === 'prev') {
        query = query.startAt(lastDocSnap);
      }
    }

    const snapshot = await query.limit(perPage).get();

    if (snapshot.empty) {
      return {
        data: [],
        count: 0,
      };
    }

    const docs: EjercicioWithRelations[] = snapshot.docs.map(doc => ({
      ejercicio: { id: doc.id, ...doc.data() } as EjercicioPrimitive,
    }));

    const snapshotCount = await firestore.collection('ejercicios').count().get();

    //console.warn(docs)

    return {
      data: docs,
      count: snapshotCount.data().count,
    };
  }

  public async getById(id: string): Promise<EjercicioPrimitive | null> {
    const docSnap = await firestore.collection('ejercicios').doc(id).get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró el ejercicio en Firestore.',
        campo: 'id',
        data: id,
      });
    }

    return { id: docSnap.id, ...docSnap.data() } as EjercicioPrimitive;
  }

  public async update(id_dado: string, ejercicio: EjercicioPrimitive): Promise<void> {
    const docRef = firestore.collection('ejercicios').doc(id_dado);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró el ejercicio con id, no se puede actualizar.',
        campo: 'id_dado',
        data: id_dado,
      });
    }

    if (!esEjercicioPrimitive(ejercicio, false)) {
      throw new BadRequest({
        message: 'La estructura del ejercicio proporcionado no es válida.',
        campo: 'ejercicio',
        data: ejercicio,
      });
    }

    if (!ejercicio || typeof ejercicio !== 'object') {
      throw new BadRequest({
        message: 'El objeto ejercicio no es válido.',
        campo: 'ejercicio',
        data: ejercicio,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...ejercicioSinId } = ejercicio as EjercicioPrimitive;

    await firestore.collection('ejercicios').doc(id_dado).update(ejercicioSinId);
    await docRef.update(ejercicioSinId);
  }
  public async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new BadRequest({
          message: 'El ID del ejercicio es requerido.',
          campo: 'id',
          data: id,
        });
      }

      const ejercicioRef = firestore.collection('ejercicios').doc(id);
      const ejercicioDoc = await ejercicioRef.get();

      if (!ejercicioDoc.exists) {
        throw new BadRequest({
          message: 'No se encontró el ejercicio.',
          campo: 'id',
          data: id,
        });
      }

      await ejercicioRef.delete();
    } catch (error) {
      console.error(error);
    }
  }
}
