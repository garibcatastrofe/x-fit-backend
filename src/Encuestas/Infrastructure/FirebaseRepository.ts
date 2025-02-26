import { EncuestaPrimitive } from '../Domain/Interfaces/EncuestaPrimitive';
import { EncuestaQuery } from '../Domain/Interfaces/FirebaseQuery';
import { EncuestaRepository } from '../Domain/Entities/EncuestaRepository';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { Timestamp } from 'firebase-admin/firestore';

function esEncuestaPrimitive(
  objeto: Partial<EncuestaPrimitive>, // Permitimos objeto parcial para evitar errores con `id`
  conId: boolean,
): objeto is EncuestaPrimitive {
  if (!objeto) return false;

  if (conId && typeof objeto.id !== 'string') return false; // `id` solo es obligatorio si `conId` es `true`

  return typeof objeto.id_empleado === 'number' && typeof objeto.fecha === 'string';
}

export class EncuestaFirebaseRepository implements EncuestaRepository {
  public async create(encuesta: Omit<EncuestaPrimitive, 'id'>): Promise<void> {
    try {
      // Convertir `fecha_creacion` de string a Timestamp
      const fechaTimestamp = Timestamp.fromDate(new Date(encuesta.fecha));

      // Crear una nueva dieta con el campo `fecha_creacion` convertido a Timestamp
      const nuevaEncuesta = {
        ...encuesta,
        fecha: fechaTimestamp,
      };

      // Agregar la dieta a Firestore
      const docRef = await firestore.collection('encuestas').add(nuevaEncuesta);

      // Actualizar el documento con su ID generado automáticamente
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
  }: EncuestaQuery<EncuestaPrimitive>): Promise<EncuestaPrimitive[]> {
    let query = firestore.collection('encuestas').orderBy(orderBy, order);

    if (esEncuestaPrimitive(ultimoDoc, false)) {
      const lastDocSnap = await firestore
        .collection('encuestas')
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
      return [];
    }

    const docs: EncuestaPrimitive[] = snapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as EncuestaPrimitive,
    );

    return docs;
  }

  public async getById(id: string): Promise<EncuestaPrimitive | null> {
    const docSnap = await firestore.collection('encuestas').doc(id).get();

    if (!docSnap.exists) {
      console.warn(`No se encontró la encuesta con id: ${id}`);
      throw new BadRequest({
        message: 'No se encontró la encuesta en Firestore.',
        campo: 'id',
        data: id,
      });
    }

    return { id: docSnap.id, ...docSnap.data() } as EncuestaPrimitive;
  }

  public async update(id_dado: string, encuesta: EncuestaPrimitive): Promise<void> {
    const docRef = firestore.collection('encuestas').doc(id_dado);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró la encuesta con id, no se puede actualizar.',
        campo: 'id_dado',
        data: id_dado,
      });
    }

    if (!esEncuestaPrimitive(encuesta, false)) {
      throw new BadRequest({
        message: 'La estructura de la encuesta proporcionada no es válida.',
        campo: 'encuesta',
        data: encuesta,
      });
    }

    if (!encuesta || typeof encuesta !== 'object') {
      throw new BadRequest({
        message: 'El objeto encuesta no es válido.',
        campo: 'encuesta',
        data: encuesta,
      });
    }

    // Extraer id para que no se actualice en Firestore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...encuestaSinId } = encuesta;

    const fechaTimestamp = Timestamp.fromDate(new Date(encuestaSinId.fecha));

    // Crear una nueva dieta con el campo `fecha_creacion` convertido a Timestamp
    const nuevaEncuesta = {
      ...encuestaSinId,
      fecha: fechaTimestamp,
    };

    await docRef.update(nuevaEncuesta);
  }

  public async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new BadRequest({
          message: 'El id de la encuesta es requerido.',
          campo: 'id',
          data: id,
        });
      }

      const encuestaRef = firestore.collection('encuestas').doc(id);
      const encuestaDoc = await encuestaRef.get();

      if (!encuestaDoc.exists) {
        throw new BadRequest({
          message: 'No se encontró la encuesta.',
          campo: 'id',
          data: id,
        });
      }

      await encuestaRef.delete();
    } catch (error) {
      console.error(error);
    }
  }
}
