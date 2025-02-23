import { DietaPrimitive } from '../Domain/Interfaces/DietaPrimitive';
//import { DietaQuery } from '../Domain/Interfaces/FirebaseQuery';
import { DietaRepository } from '../Domain/Entities/DietaRepository';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';
//import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

/* function esDietaPrimitive(
  objeto: Partial<DietaPrimitive>, // Permitimos objeto parcial para evitar errores con `id`
  conId: boolean,
): objeto is DietaPrimitive {
  if (!objeto) return false;

  if (conId && typeof objeto.id !== 'string') return false; // `id` solo es obligatorio si `conId` es `true`

  return (
    typeof objeto.nombre === 'string' &&
    typeof objeto.clasificacion === 'string' &&
    typeof objeto.proteinas === 'number' &&
    typeof objeto.carbohidratos === 'number' &&
    typeof objeto.grasas === 'number' &&
    typeof objeto.unidad_medicion === 'string'
  );
} */

export class DietaFirebaseRepository implements DietaRepository {
  public async create(dieta: Omit<DietaPrimitive, 'id'>): Promise<void> {
    try {
      const docRef = await firestore.collection('dietas').add(dieta);
      await docRef.update({ id: docRef.id });
    } catch (error) {
      console.error(error);
    }
  }

  /* public async getAll({
    ultimoDoc,
    perPage,
    order,
    orderBy,
    direction,
  }: AlimentoQuery<AlimentoPrimitive>): Promise<AlimentoPrimitive[]> {


    let query = firestore.collection('alimentos').orderBy(orderBy, order);

    if (esAlimentoPrimitive(ultimoDoc, false)) {
      

      const lastDocSnap = await firestore
        .collection('alimentos')
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

    
    const docs: AlimentoPrimitive[] = snapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as AlimentoPrimitive,
    );

    return docs;
  }

  public async getById(id: string): Promise<AlimentoPrimitive | null> {
    const docSnap = await firestore.collection('alimentos').doc(id).get();

    if (!docSnap.exists) {
      console.warn(`No se encontró el alimento con id: ${id}`);
      throw new BadRequest({
        message: 'No se encontró el alimento en Firestore.',
        campo: 'id',
        data: id,
      });
    }

    return { id: docSnap.id, ...docSnap.data() } as AlimentoPrimitive;
  }

  public async update(id_dado: string, alimento: AlimentoPrimitive): Promise<void> {
    
    const docRef = firestore.collection('alimentos').doc(id_dado);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró el alimento con id, no se puede actualizar.',
        campo: 'id_dado',
        data: id_dado,
      });
    }

    
    if (!esAlimentoPrimitive(alimento, false)) {
      throw new BadRequest({
        message: 'La estructura del alimento proporcionado no es válida.',
        campo: 'alimento',
        data: alimento,
      });
    }

    if (!alimento || typeof alimento !== 'object') {
      throw new BadRequest({
        message: 'El objeto alimento no es válido.',
        campo: 'alimento',
        data: alimento,
      });
    }

    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...alimentoSinId } = alimento as AlimentoPrimitive; 

    
    await firestore.collection('alimentos').doc(id_dado).update(alimentoSinId);

    
    await docRef.update(alimentoSinId);
  }
  public async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new BadRequest({
          message: 'El ID del alimento es requerido.',
          campo: 'id',
          data: id,
        });
      }

      const alimentoRef = firestore.collection('alimentos').doc(id);
      const alimentoDoc = await alimentoRef.get();

      if (!alimentoDoc.exists) {
        throw new BadRequest({
          message: 'No se encontró el alimento.',
          campo: 'id',
          data: id,
        });
      }

      await alimentoRef.delete();
    } catch (error) {
      console.error(error);
    }
  } */
}
