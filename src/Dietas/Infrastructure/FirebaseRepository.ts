import { DietaPrimitive } from '../Domain/Interfaces/DietaPrimitive';
import { DietaQuery } from '../Domain/Interfaces/FirebaseQuery';
import { DietaRepository } from '../Domain/Entities/DietaRepository';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { Timestamp } from 'firebase-admin/firestore';

function esDietaPrimitive(
  objeto: Partial<DietaPrimitive>, // Permitimos objeto parcial para evitar errores con `id`
  conId: boolean,
): objeto is DietaPrimitive {
  if (!objeto) return false;

  if (conId && typeof objeto.id !== 'string') return false; // `id` solo es obligatorio si `conId` es `true`

  return (
    typeof objeto.id_cliente === 'number' &&
    typeof objeto.id_empleado === 'number' &&
    typeof objeto.fecha_creacion === 'string' &&
    typeof objeto.peso_kilogramos === 'number' &&
    typeof objeto.estatura_centimetros === 'number' &&
    typeof objeto.cuello_pulgadas === 'number' &&
    typeof objeto.cintura_pulgadas === 'number' &&
    typeof objeto.cadera_pulgadas === 'number' &&
    typeof objeto.objetivo === 'string' &&
    typeof objeto.factor_actividad === 'string' &&
    typeof objeto.visible === 'string'
  );
}

export class DietaFirebaseRepository implements DietaRepository {
  public async create(dieta: Omit<DietaPrimitive, 'id'>): Promise<void> {
    try {
      // Convertir `fecha_creacion` de string a Timestamp
      const fechaTimestamp = Timestamp.fromDate(new Date(dieta.fecha_creacion));

      // Crear una nueva dieta con el campo `fecha_creacion` convertido a Timestamp
      const nuevaDieta = {
        ...dieta,
        fecha_creacion: fechaTimestamp,
      };

      // Agregar la dieta a Firestore
      const docRef = await firestore.collection('dietas').add(nuevaDieta);

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
  }: DietaQuery<DietaPrimitive>): Promise<DietaPrimitive[]> {
    let query = firestore.collection('dietas').orderBy(orderBy, order);

    if (esDietaPrimitive(ultimoDoc, false)) {
      const lastDocSnap = await firestore
        .collection('dietas')
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

    const docs: DietaPrimitive[] = snapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as DietaPrimitive,
    );

    return docs;
  }

  public async getById(id: string): Promise<DietaPrimitive | null> {
    const docSnap = await firestore.collection('dietas').doc(id).get();

    if (!docSnap.exists) {
      console.warn(`No se encontró la dieta con id: ${id}`);
      throw new BadRequest({
        message: 'No se encontró la dieta en Firestore.',
        campo: 'id',
        data: id,
      });
    }

    return { id: docSnap.id, ...docSnap.data() } as DietaPrimitive;
  }

  public async update(id_dado: string, dieta: DietaPrimitive): Promise<void> {
    const docRef = firestore.collection('dietas').doc(id_dado);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró la dieta con id, no se puede actualizar.',
        campo: 'id_dado',
        data: id_dado,
      });
    }

    if (!esDietaPrimitive(dieta, false)) {
      throw new BadRequest({
        message: 'La estructura de la dieta proporcionada no es válida.',
        campo: 'dieta',
        data: dieta,
      });
    }

    if (!dieta || typeof dieta !== 'object') {
      throw new BadRequest({
        message: 'El objeto dieta no es válido.',
        campo: 'dieta',
        data: dieta,
      });
    }

    // Extraer id para que no se actualice en Firestore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...dietaSinId } = dieta;

    const fechaTimestamp = Timestamp.fromDate(new Date(dietaSinId.fecha_creacion));

    // Crear una nueva dieta con el campo `fecha_creacion` convertido a Timestamp
    const nuevaDieta = {
      ...dietaSinId,
      fecha_creacion: fechaTimestamp,
    };

    await docRef.update(nuevaDieta);
  }

  public async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new BadRequest({
          message: 'El id de la dieta es requerido.',
          campo: 'id',
          data: id,
        });
      }

      const dietaRef = firestore.collection('dietas').doc(id);
      const dietaDoc = await dietaRef.get();

      if (!dietaDoc.exists) {
        throw new BadRequest({
          message: 'No se encontró la dieta.',
          campo: 'id',
          data: id,
        });
      }

      await dietaRef.delete();
    } catch (error) {
      console.error(error);
    }
  }
}
