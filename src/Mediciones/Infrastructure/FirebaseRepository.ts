import { MedicionPrimitive } from '../Domain/Interfaces/MedicionPrimitive';
import { MedicionQuery } from '../Domain/Interfaces/FirebaseQuery';
import { MedicionRepository } from '../Domain/Entities/MedicionRepository';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

function esMedicionPrimitive(
  objeto: Partial<MedicionPrimitive>, // Permitimos objeto parcial para evitar errores con `id`
  conId: boolean,
): objeto is MedicionPrimitive {
  if (!objeto) return false;

  if (conId && typeof objeto.id !== 'string') return false; // `id` solo es obligatorio si `conId` es `true`

  return (
    typeof objeto.id_cliente === 'number' &&
    typeof objeto.fecha === 'string' &&
    typeof objeto.brazo_derecho === 'number' &&
    typeof objeto.brazo_izquierdo === 'number' &&
    typeof objeto.pierna_derecha === 'number' &&
    typeof objeto.pierna_izquierda === 'number' &&
    typeof objeto.cadera === 'number' &&
    typeof objeto.abdomen === 'number' &&
    typeof objeto.espalda === 'number' &&
    typeof objeto.cuello === 'number'
  );
}

export class MedicionFirebaseRepository implements MedicionRepository {
  public async create(medicion: Omit<MedicionPrimitive, 'id'>): Promise<void> {
    try {
      const docRef = await firestore.collection('mediciones').add(medicion);
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
  }: MedicionQuery<MedicionPrimitive>): Promise<MedicionPrimitive[]> {
    let query = firestore.collection('mediciones').orderBy(orderBy, order);

    if (esMedicionPrimitive(ultimoDoc, false)) {
      const lastDocSnap = await firestore
        .collection('mediciones')
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

    const docs: MedicionPrimitive[] = snapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as MedicionPrimitive,
    );

    return docs;
  }

  public async getById(id: string): Promise<MedicionPrimitive | null> {
    const docSnap = await firestore.collection('mediciones').doc(id).get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró la medicion en Firestore.',
        campo: 'id',
        data: id,
      });
    }

    return { id: docSnap.id, ...docSnap.data() } as MedicionPrimitive;
  }

  public async update(id_dado: string, medicion: MedicionPrimitive): Promise<void> {
    const docRef = firestore.collection('mediciones').doc(id_dado);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró la medicion con id, no se puede actualizar.',
        campo: 'id_dado',
        data: id_dado,
      });
    }

    if (!esMedicionPrimitive(medicion, false)) {
      throw new BadRequest({
        message: 'La estructura de la medicion proporcionado no es válida.',
        campo: 'medicion',
        data: medicion,
      });
    }

    if (!medicion || typeof medicion !== 'object') {
      throw new BadRequest({
        message: 'El objeto medicion no es válido.',
        campo: 'medicion',
        data: medicion,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...medicionSinId } = medicion as MedicionPrimitive;

    await firestore.collection('mediciones').doc(id_dado).update(medicionSinId);
    await docRef.update(medicionSinId);
  }
  public async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new BadRequest({
          message: 'El ID de la medicion es requerido.',
          campo: 'id',
          data: id,
        });
      }

      const medicionRef = firestore.collection('mediciones').doc(id);
      const medicionDoc = await medicionRef.get();

      if (!medicionDoc.exists) {
        throw new BadRequest({
          message: 'No se encontró la medicion.',
          campo: 'id',
          data: id,
        });
      }

      await medicionRef.delete();
    } catch (error) {
      console.error(error);
    }
  }
}
