import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { CLASIFICACION, ClasificacionType } from '../Interfaces/Clasificacion';

export class AlimentoClasificacion {
  public value: string;
  private campo = 'clasificacion';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message:
          'Favor de Seleccionar una opción para clasificacion: PROTEINA, CARBOHIDRATOS, GRASAS, VEGETALES, FRUTAS, BEBIDAS, ENDULZANTES, SAZONADORES o SNACKS',
        campo: this.campo,
      });
    }
    if (!CLASIFICACION.includes(value as ClasificacionType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido de tipo clasificacion: PROTEINA, CARBOHIDRATOS, GRASAS, VEGETALES, FRUTAS, BEBIDAS, ENDULZANTES, SAZONADORES o SNACKS',
        campo: this.campo,
        data: value,
      });
    }
  }
}
