import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { UNIDAD_MEDICION, UnidadMedicionType } from '../Interfaces/UnidadMedicion';

export class AlimentoUnidadMedicion {
  public value: string;
  private campo = 'unidad_medicion';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message:
          'Favor de Seleccionar una opción para unidad_medicion: MILILITROS, GRAMOS, PIEZA, REBANADA, MITAD, CUCHARADA, LATA, BOTELLA, SOBRE, TAZA o PORCION',
        campo: this.campo,
      });
    }
    if (!UNIDAD_MEDICION.includes(value as UnidadMedicionType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido de tipo unidad_medicion: MILILITROS, GRAMOS, PIEZA, REBANADA, MITAD, CUCHARADA, LATA, BOTELLA, SOBRE, TAZA o PORCION',
        campo: this.campo,
        data: value,
      });
    }
  }
}
