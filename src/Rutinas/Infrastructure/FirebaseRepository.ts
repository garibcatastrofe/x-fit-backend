import { RutinaPrimitive } from '../Domain/Interfaces/RutinaPrimitive';
import { RutinaQuery } from '../Domain/Interfaces/FirebaseQuery';
import { RutinaRepository } from '../Domain/Entities/RutinaRepository';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { Timestamp } from 'firebase-admin/firestore';

function esRutinaPrimitive(
  objeto: Partial<RutinaPrimitive>, // Permitimos objeto parcial para evitar errores con `id`
  conId: boolean,
): objeto is RutinaPrimitive {
  if (!objeto) return false;

  if (conId && typeof objeto.id !== 'string') return false; // `id` solo es obligatorio si `conId` es `true`

  return (
    typeof objeto.id_cliente === 'number' &&
    typeof objeto.id_empleado === 'number' &&
    typeof objeto.fecha_creacion === 'string' &&
    typeof objeto.objetivo === 'string' &&
    typeof objeto.visible === 'string'
  );
}

export class RutinaFirebaseRepository implements RutinaRepository {
  public async create(rutina: Omit<RutinaPrimitive, 'id'>): Promise<void> {
    try {
      const fechaTimestamp = Timestamp.fromDate(new Date(rutina.fecha_creacion));

      const nuevaRutina = {
        ...rutina,
        fecha_creacion: fechaTimestamp,
      };

      const docRef = await firestore.collection('rutinas').add(nuevaRutina);

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
  }: RutinaQuery<RutinaPrimitive>): Promise<RutinaPrimitive[]> {
    let query = firestore.collection('rutinas').orderBy(orderBy, order);

    if (esRutinaPrimitive(ultimoDoc, false)) {
      const lastDocSnap = await firestore
        .collection('rutinas')
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

    const docs: RutinaPrimitive[] = snapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as RutinaPrimitive,
    );

    return docs;
  }

  public async getById(id: string): Promise<RutinaPrimitive | null> {
    const docSnap = await firestore.collection('rutinas').doc(id).get();

    if (!docSnap.exists) {
      console.warn(`No se encontró la dieta con id: ${id}`);
      throw new BadRequest({
        message: 'No se encontró la dieta en Firestore.',
        campo: 'id',
        data: id,
      });
    }

    return { id: docSnap.id, ...docSnap.data() } as RutinaPrimitive;
  }

  public async update(id_dado: string, rutina: RutinaPrimitive): Promise<void> {
    const docRef = firestore.collection('rutinas').doc(id_dado);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró la rutina con id, no se puede actualizar.',
        campo: 'id_dado',
        data: id_dado,
      });
    }

    if (!esRutinaPrimitive(rutina, false)) {
      throw new BadRequest({
        message: 'La estructura de la rutina proporcionada no es válida.',
        campo: 'rutina',
        data: rutina,
      });
    }

    if (!rutina || typeof rutina !== 'object') {
      throw new BadRequest({
        message: 'El objeto rutina no es válido.',
        campo: 'rutina',
        data: rutina,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rutinaSinId } = rutina;

    const fechaTimestamp = Timestamp.fromDate(new Date(rutinaSinId.fecha_creacion));

    const nuevaRutina = {
      ...rutinaSinId,
      fecha_creacion: fechaTimestamp,
    };

    await docRef.update(nuevaRutina);
  }

  public async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new BadRequest({
          message: 'El id de la rutina es requerido.',
          campo: 'id',
          data: id,
        });
      }

      const rutinaRef = firestore.collection('rutinas').doc(id);
      const rutinaDoc = await rutinaRef.get();

      if (!rutinaDoc.exists) {
        throw new BadRequest({
          message: 'No se encontró la rutina.',
          campo: 'id',
          data: id,
        });
      }

      await rutinaRef.delete();
    } catch (error) {
      console.error(error);
    }
  }
}
