import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { AlimentoDietaPrimitive } from '../../Interfaces/DietaPrimitive';
import { firestore } from '@/src/Database/Infrastructure/Firebase/firebase';

export class AlimentoDieta {
  public id_alimento: string;
  public cantidad: number;

  private constructor(id_alimento: string, cantidad: number) {
    this.id_alimento = id_alimento;
    this.cantidad = cantidad;
  }

  public static async create(id_alimento: string, cantidad: number): Promise<AlimentoDieta> {
    // Validaciones antes de crear la instancia
    if (!id_alimento) {
      throw new BadRequest({
        message: 'El ID del alimento es necesario',
        campo: 'id_alimento',
        data: id_alimento,
      });
    }

    if (id_alimento.length > 50) {
      throw new BadRequest({
        message: 'El id del alimento en la dieta debe de ser menor a 50 caracteres',
        campo: 'id_alimento',
        data: id_alimento,
      });
    }

    if (cantidad <= 0 || cantidad > 2000) {
      throw new BadRequest({
        message: 'La cantidad debe estar entre 1 y 2000',
        campo: 'cantidad',
        data: cantidad,
      });
    }

    // Validar que el alimento exista en Firestore
    const docSnap = await firestore.collection('alimentos').doc(id_alimento).get();
    if (!docSnap.exists) {
      throw new BadRequest({
        message: 'No se encontró el alimento en Firestore.',
        campo: 'id_alimento',
        data: id_alimento,
      });
    }

    // Si pasa todas las validaciones, se crea la instancia
    return new AlimentoDieta(id_alimento, cantidad);
  }

  public toPrimitive(): AlimentoDietaPrimitive {
    return {
      id_alimento: this.id_alimento,
      cantidad: this.cantidad,
    };
  }
}

