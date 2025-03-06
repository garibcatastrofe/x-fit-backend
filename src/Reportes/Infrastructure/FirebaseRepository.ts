import { ReportePrimitive } from '../Domain/Interfaces/ReportePrimitive';
import { ReporteQuery } from '../Domain/Interfaces/FirebaseQuery';
import { ReporteRepository } from '../Domain/Entities/ReporteRepository';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { Timestamp } from 'firebase-admin/firestore';

function esReportePrimitive(
  objeto: Partial<ReportePrimitive>, // Permitimos objeto parcial para evitar errores con `id`
  conId: boolean,
): objeto is ReportePrimitive {
  if (!objeto) return false;

  if (conId && typeof objeto.id !== 'string') return false; // `id` solo es obligatorio si `conId` es `true`

  return (
    typeof objeto.id_cliente === 'number' &&
    typeof objeto.id_rutina === 'string' &&
    typeof objeto.bloque === 'string' &&
    typeof objeto.sesion === 'string' &&
    typeof objeto.fecha === 'string'
  );
}

export class ReporteFirebaseRepository implements ReporteRepository {
  public async create(reporte: Omit<ReportePrimitive, 'id'>): Promise<void> {
    try {
      // Convertir `fecha_creacion` de string a Timestamp
      const fechaTimestamp = Timestamp.fromDate(new Date(reporte.fecha));

      // Crear una nueva dieta con el campo `fecha_creacion` convertido a Timestamp
      const nuevoReporte = {
        ...reporte,
        fecha: fechaTimestamp,
      };

      // Agregar la dieta a Firestore
      const docRef = await firestore.collection('reportes').add(nuevoReporte);

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
  }: ReporteQuery<ReportePrimitive>): Promise<ReportePrimitive[]> {
    let query = firestore.collection('reportes').orderBy(orderBy, order);

    if (esReportePrimitive(ultimoDoc, false)) {
      const lastDocSnap = await firestore
        .collection('reportes')
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

    const docs: ReportePrimitive[] = snapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as ReportePrimitive,
    );

    return docs;
  }

  public async getById(id: string): Promise<ReportePrimitive | null> {
    const docSnap = await firestore.collection('reportes').doc(id).get();

    if (!docSnap.exists) {
      console.warn(`No se encontró el reporte con id: ${id}`);
      throw new BadRequest({
        message: 'No se encontró el reporte en Firestore.',
        campo: 'id',
        data: id,
      });
    }

    return { id: docSnap.id, ...docSnap.data() } as ReportePrimitive;
  }

  public async update(id_dado: string, reporte: ReportePrimitive): Promise<void> {
    const docRef = firestore.collection('reportes').doc(id_dado);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró el reporte con id, no se puede actualizar.',
        campo: 'id_dado',
        data: id_dado,
      });
    }

    if (!esReportePrimitive(reporte, false)) {
      throw new BadRequest({
        message: 'La estructura del reporte proporcionado no es válida.',
        campo: 'reporte',
        data: reporte,
      });
    }

    if (!reporte || typeof reporte !== 'object') {
      throw new BadRequest({
        message: 'El objeto reporte no es válido.',
        campo: 'reporte',
        data: reporte,
      });
    }

    // Extraer id para que no se actualice en Firestore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...reporteSinId } = reporte;

    const fechaTimestamp = Timestamp.fromDate(new Date(reporteSinId.fecha));

    // Crear una nueva dieta con el campo `fecha_creacion` convertido a Timestamp
    const nuevoReporte = {
      ...reporteSinId,
      fecha: fechaTimestamp,
    };

    await docRef.update(nuevoReporte);
  }

  public async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new BadRequest({
          message: 'El id del reporte es requerido.',
          campo: 'id',
          data: id,
        });
      }

      const reporteRef = firestore.collection('reportes').doc(id);
      const reporteDoc = await reporteRef.get();

      if (!reporteDoc.exists) {
        throw new BadRequest({
          message: 'No se encontró el reporte.',
          campo: 'id',
          data: id,
        });
      }

      await reporteRef.delete();
    } catch (error) {
      console.error(error);
    }
  }
}
