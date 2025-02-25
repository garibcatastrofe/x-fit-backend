import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { OBJETIVO, ObjetivoType } from '../Interfaces/Objetivo';

export class RutinaObjetivo {
  public value: string;
  private campo = 'objetivo';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message:
          'Favor de Seleccionar una opción para objetivo: GANAR MASA MUSCULAR, PERDIDA DE GRASA, RECOMPOSICION CORPORAL o ACONDICIONAMIENTO FISICO',
        campo: this.campo,
      });
    }
    if (!OBJETIVO.includes(value as ObjetivoType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido para objetivo: GANAR MASA MUSCULAR, PERDIDA DE GRASA, RECOMPOSICION CORPORAL o ACONDICIONAMIENTO FISICO',
        campo: this.campo,
        data: value,
      });
    }
  }
}
