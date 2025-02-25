import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { SesionPrimitive } from '../../Interfaces/RutinaPrimitive';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';

export class Ejercicio {
  public id_ejercicio: string;

  public constructor(id_ejercicio: string) {
    this.id_ejercicio = id_ejercicio;
  }

  public static async create(id_ejercicio: string): Promise<SesionPrimitive> {
    // Validaciones antes de crear la instancia
    if (!id_ejercicio) {
      throw new BadRequest({
        message: 'El ID del ejercicio es requerido',
        campo: 'id_ejercicio',
        data: id_ejercicio,
      });
    }

    if (id_ejercicio.length > 50) {
      throw new BadRequest({
        message: 'El id del ejercicio en la rutina debe de ser menor a 50 caracteres',
        campo: 'id_ejercicio',
        data: id_ejercicio,
      });
    }

    // Validar que el alimento exista en Firestore
    const docSnap = await firestore.collection('ejercicios').doc(id_ejercicio).get();
    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró el ejercicio en Firestore.',
        campo: 'id_ejercicio',
        data: id_ejercicio,
      });
    }

    // Si pasa todas las validaciones, se crea la instancia
    return new Ejercicio(id_ejercicio);
  }

  public toPrimitive(): SesionPrimitive {
    return {
      id_ejercicio: this.id_ejercicio,
    };
  }
}
