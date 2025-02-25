import { RuffierPrimitive } from '../Domain/Interfaces/RuffierPrimitive';
import { RuffierQuery } from '../Domain/Interfaces/FirebaseQuery';
import { RuffierRepository } from '../Domain/Entities/RuffierRepository';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

function esRuffierPrimitive(
  objeto: Partial<RuffierPrimitive>, // Permitimos objeto parcial para evitar errores con `id`
  conId: boolean,
): objeto is RuffierPrimitive {
  if (!objeto) return false;

  if (conId && typeof objeto.id !== 'string') return false; // `id` solo es obligatorio si `conId` es `true`

  return (
    typeof objeto.id_cliente === 'number' &&
    typeof objeto.id_rutina === 'string' &&
    typeof objeto.bloque === 'string' &&
    typeof objeto.fecha === 'string' &&
    typeof objeto.fc_previa === 'number' &&
    typeof objeto.fc_terminar_esfuerzo === 'number' &&
    typeof objeto.fc_minuto_terminar_esfuerzo === 'number'
  );
}

export class RuffierFirebaseRepository implements RuffierRepository {
  public async create(ruffier: Omit<RuffierPrimitive, 'id'>): Promise<void> {
    try {
      const docRef = await firestore.collection('ruffiers').add(ruffier);
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
  }: RuffierQuery<RuffierPrimitive>): Promise<RuffierPrimitive[]> {
    let query = firestore.collection('ruffiers').orderBy(orderBy, order);

    if (esRuffierPrimitive(ultimoDoc, false)) {
      const lastDocSnap = await firestore
        .collection('ruffiers')
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

    const docs: RuffierPrimitive[] = snapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as RuffierPrimitive,
    );

    return docs;
  }

  public async getById(id: string): Promise<RuffierPrimitive | null> {
    const docSnap = await firestore.collection('ruffiers').doc(id).get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró el ruffier en Firestore.',
        campo: 'id',
        data: id,
      });
    }

    return { id: docSnap.id, ...docSnap.data() } as RuffierPrimitive;
  }

  public async update(id_dado: string, ruffier: RuffierPrimitive): Promise<void> {
    const docRef = firestore.collection('ruffiers').doc(id_dado);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró el ruffier con id, no se puede actualizar.',
        campo: 'id_dado',
        data: id_dado,
      });
    }

    if (!esRuffierPrimitive(ruffier, false)) {
      throw new BadRequest({
        message: 'La estructura del ruffier proporcionado no es válida.',
        campo: 'ruffier',
        data: ruffier,
      });
    }

    if (!ruffier || typeof ruffier !== 'object') {
      throw new BadRequest({
        message: 'El objeto ruffier no es válido.',
        campo: 'ruffier',
        data: ruffier,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...ruffierSinId } = ruffier as RuffierPrimitive;

    await firestore.collection('ruffiers').doc(id_dado).update(ruffierSinId);
    await docRef.update(ruffierSinId);
  }
  public async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new BadRequest({
          message: 'El ID del ruffier es requerido.',
          campo: 'id',
          data: id,
        });
      }

      const ruffierRef = firestore.collection('ruffiers').doc(id);
      const ruffierDoc = await ruffierRef.get();

      if (!ruffierDoc.exists) {
        throw new BadRequest({
          message: 'No se encontró el ruffier.',
          campo: 'id',
          data: id,
        });
      }

      await ruffierRef.delete();
    } catch (error) {
      console.error(error);
    }
  }
}
