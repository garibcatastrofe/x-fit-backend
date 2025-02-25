import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { OBJETIVO_PROGRAMA, ObjetivoProgramaType } from '../../Interfaces/ObjetivoPrograma';

export class ObjetivoPrograma {
  public value: string;
  private campo = 'objetivo_programa';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message:
          'Favor de Seleccionar una opción para objetivo_programa: FUERZA, HIPERTROFIA o RESISTENCIA',
        campo: this.campo
      });
    }
    if (!OBJETIVO_PROGRAMA.includes(value as ObjetivoProgramaType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido para objetivo_programa: FUERZA, HIPERTROFIA o RESISTENCIA',
        campo: this.campo,
        data: value,
      });
    }
  }
}
