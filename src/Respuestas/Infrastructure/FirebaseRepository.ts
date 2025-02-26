import { RespuestaPrimitive } from '../Domain/Interfaces/RespuestaPrimitive';
import { RespuestaQuery } from '../Domain/Interfaces/FirebaseQuery';
import { RespuestaRepository } from '../Domain/Entities/RespuestaRepository';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { Timestamp } from 'firebase-admin/firestore';

function esRespuestaPrimitive(
  objeto: Partial<RespuestaPrimitive>, // Permitimos objeto parcial para evitar errores con `id`
  conId: boolean,
): objeto is RespuestaPrimitive {
  if (!objeto) return false;

  if (conId && typeof objeto.id !== 'string') return false; // `id` solo es obligatorio si `conId` es `true`

  return (
    typeof objeto.id_usuario === 'number' &&
    typeof objeto.id_encuesta === 'string' &&
    typeof objeto.fecha === 'string'
  );
}

export class RespuestaFirebaseRepository implements RespuestaRepository {
  public async create(respuesta: Omit<RespuestaPrimitive, 'id'>): Promise<void> {
    try {
      // Convertir `fecha_creacion` de string a Timestamp
      const fechaTimestamp = Timestamp.fromDate(new Date(respuesta.fecha));

      // Crear una nueva dieta con el campo `fecha_creacion` convertido a Timestamp
      const nuevaRespuesta = {
        ...respuesta,
        fecha: fechaTimestamp,
      };

      // Agregar la dieta a Firestore
      const docRef = await firestore.collection('respuestas').add(nuevaRespuesta);

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
  }: RespuestaQuery<RespuestaPrimitive>): Promise<RespuestaPrimitive[]> {
    let query = firestore.collection('respuestas').orderBy(orderBy, order);

    if (esRespuestaPrimitive(ultimoDoc, false)) {
      const lastDocSnap = await firestore
        .collection('respuestas')
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

    const docs: RespuestaPrimitive[] = snapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as RespuestaPrimitive,
    );

    return docs;
  }

  public async getById(id: string): Promise<RespuestaPrimitive | null> {
    const docSnap = await firestore.collection('respuestas').doc(id).get();

    if (!docSnap.exists) {
      console.warn(`No se encontró la respuesta con id: ${id}`);
      throw new BadRequest({
        message: 'No se encontró la respuesta en Firestore.',
        campo: 'id',
        data: id,
      });
    }

    return { id: docSnap.id, ...docSnap.data() } as RespuestaPrimitive;
  }

  public async update(id_dado: string, respuesta: RespuestaPrimitive): Promise<void> {
    const docRef = firestore.collection('respuestas').doc(id_dado);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró la respuesta con id, no se puede actualizar.',
        campo: 'id_dado',
        data: id_dado,
      });
    }

    if (!esRespuestaPrimitive(respuesta, false)) {
      throw new BadRequest({
        message: 'La estructura de la respuesta proporcionada no es válida.',
        campo: 'respuesta',
        data: respuesta,
      });
    }

    if (!respuesta || typeof respuesta !== 'object') {
      throw new BadRequest({
        message: 'El objeto respuesta no es válido.',
        campo: 'respuesta',
        data: respuesta,
      });
    }

    // Extraer id para que no se actualice en Firestore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...respuestaSinId } = respuesta;

    const fechaTimestamp = Timestamp.fromDate(new Date(respuestaSinId.fecha));

    // Crear una nueva dieta con el campo `fecha_creacion` convertido a Timestamp
    const nuevaRespuesta = {
      ...respuestaSinId,
      fecha: fechaTimestamp,
    };

    await docRef.update(nuevaRespuesta);
  }

  public async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new BadRequest({
          message: 'El id de la respuesta es requerido.',
          campo: 'id',
          data: id,
        });
      }

      const respuestaRef = firestore.collection('respuestas').doc(id);
      const respuestaDoc = await respuestaRef.get();

      if (!respuestaDoc.exists) {
        throw new BadRequest({
          message: 'No se encontró la respuesta.',
          campo: 'id',
          data: id,
        });
      }

      await respuestaRef.delete();
    } catch (error) {
      console.error(error);
    }
  }
}
