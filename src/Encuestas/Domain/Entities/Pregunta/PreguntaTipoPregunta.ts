import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { TIPO_PREGUNTA, TipoPreguntaType } from '../../Interfaces/TipoPregunta';

export class PreguntaTipoPregunta {
  public value: string;
  private campo = 'tipo_pregunta';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message: 'Favor de Seleccionar una opción para tipo_pregunta: ABIERTA o CERRADA',
        campo: this.campo,
      });
    }
    if (!TIPO_PREGUNTA.includes(value as TipoPreguntaType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido para tipo_pregunta: ABIERTA o CERRADA',
        campo: this.campo,
        data: value,
      });
    }
  }
}
