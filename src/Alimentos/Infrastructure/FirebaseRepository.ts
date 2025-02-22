import { AlimentoPrimitive } from '../Domain/Interfaces/AlimentoPrimitive';
import { AlimentoQuery } from '../Domain/Interfaces/Query';
import { AlimentoRepository } from '../Domain/Entities/AlimentoRepository';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

function esAlimentoPrimitive(
  objeto: Partial<AlimentoPrimitive>, // Permitimos objeto parcial para evitar errores con `id`
  conId: boolean,
): objeto is AlimentoPrimitive {
  if (!objeto) return false;

  if (conId && typeof objeto.id !== 'string') return false; // `id` solo es obligatorio si `conId` es `true`

  return (
    typeof objeto.nombre === 'string' &&
    typeof objeto.clasificacion === 'string' &&
    typeof objeto.calorias === 'number' &&
    typeof objeto.proteinas === 'number' &&
    typeof objeto.carbohidratos === 'number' &&
    typeof objeto.grasas === 'number' &&
    typeof objeto.unidad_medicion === 'string'
  );
}

export class AlimentoFirebaseRepository implements AlimentoRepository {
  public async create(alimento: Omit<AlimentoPrimitive, 'id'>): Promise<void> {
    try {
      //console.warn('Alimento a ingresar', alimento);
      const docRef = await firestore.collection('alimentos').add(alimento);
      await docRef.update({ id: docRef.id });
      //console.warn('Documento del alimento agregado con ID:', docRef.id);
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
  }: AlimentoQuery<AlimentoPrimitive>): Promise<AlimentoPrimitive[]> {
    /* console.warn('Último almiento proporcionado: ', ultimoDoc);
    console.warn('Alimentos por página: ', perPage);
    console.warn('En orden: ', order);
    console.warn('Ordenar por: ', orderBy);
    console.warn('Dirección: ', direction); */

    let query = firestore.collection('alimentos').orderBy(orderBy, order);

    if (esAlimentoPrimitive(ultimoDoc, false)) {
      //console.warn('Último documento proporcionado:', ultimoDoc);

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
        //console.warn('Se irá a la siguiente página');
        query = query.startAfter(lastDocSnap);
      } else if (direction === 'prev') {
        //console.warn('Se irá a la página anterior');
        query = query.startAt(lastDocSnap);
      }
    }

    const snapshot = await query.limit(perPage).get();

    if (snapshot.empty) {
      //console.warn('Snapshot llegó vacía');
      return [];
    }

    // Obtener los documentos y sus datos
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
    // Verificar si el documento existe
    const docRef = firestore.collection('alimentos').doc(id_dado);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró el alimento con id, no se puede actualizar.',
        campo: 'id_dado',
        data: id_dado,
      });
    }

    // Validar que el objeto `alimento` tenga la estructura correcta
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

    // Eliminar la propiedad `id` si existe en el objeto para evitar problemas
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...alimentoSinId } = alimento as AlimentoPrimitive; // Aseguramos que es un objeto

    // Si `id` no está definido, entonces no pasa nada
    await firestore.collection('alimentos').doc(id_dado).update(alimentoSinId);

    // Actualizar el documento en Firestore
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
  }
}
