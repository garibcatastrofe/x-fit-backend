import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { AlimentoDietaPrimitive } from '../../Interfaces/DietaPrimitive';

export class AlimentoDieta {
  public id_alimento: string;
  public cantidad: number;

  private campoId = 'id_alimento';
  private campoCantidad = 'cantidad';

  public constructor(id_alimento: string, cantidad: number) {
    this.ensureIsValid(id_alimento, cantidad);
    this.id_alimento = id_alimento;
    this.cantidad = cantidad;
  }

  private ensureIsValid(id_alimento: string, cantidad: number): void {
    if (!id_alimento) {
      throw new BadRequest({
        message: 'El ID del alimento es necesario',
        campo: this.campoId,
        data: id_alimento,
      });
    }

    if (id_alimento.length > 50)
      throw new BadRequest({
        message: 'El id del alimento en la dieta debe de ser menor a 50 caracteres',
        campo: this.id_alimento,
        data: id_alimento,
      });

    if (cantidad <= 0) {
      throw new BadRequest({
        message: 'La cantidad debe ser mayor a 0',
        campo: this.campoCantidad,
        data: cantidad,
      });
    }

    if (cantidad > 2000) {
      throw new BadRequest({
        message: 'La cantidad debe ser menor a 2000',
        campo: this.campoCantidad,
        data: cantidad,
      });
    }
  }

  public toPrimitive(): AlimentoDietaPrimitive {
    return {
      id_alimento: this.id_alimento,
      cantidad: this.cantidad,
    };
  }
}
