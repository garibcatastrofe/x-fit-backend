import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { FACTOR_ACTIVIDAD, FactorActividadType } from '../Interfaces/FactorActividad';

export class DietaFactorActividad {
  public value: string;
  private campo = 'factor_actividad';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message:
          'Favor de Seleccionar una opción para factor_actividad: SEDENTARIO, ACTIVIDAD LIGERA, ACTIVIDAD MODERADA, ACTIVIDAD INTENSA o ACTIVIDAD MUY INTENSA',
        campo: this.campo,
      });
    }
    if (!FACTOR_ACTIVIDAD.includes(value as FactorActividadType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido para factor_actividad: SEDENTARIO, ACTIVIDAD LIGERA, ACTIVIDAD MODERADA, ACTIVIDAD INTENSA o ACTIVIDAD MUY INTENSA',
        campo: this.campo,
        data: value,
      });
    }
  }
}
