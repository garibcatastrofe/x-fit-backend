import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { TIPO_RESPUESTA, TipoRespuestaType } from '../../Interfaces/TipoRespuesta';

export class PreguntaTipoRespuesta {
  public value: string;
  private campo = 'tipo_respuesta';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message: 'Favor de Seleccionar una opción para tipo_respuesta: PALABRAS, NUMEROS o FECHA',
        campo: this.campo,
      });
    }
    if (!TIPO_RESPUESTA.includes(value as TipoRespuestaType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido para tipo_respuesta: PALABRAS, NUMEROS o FECHA',
        campo: this.campo,
        data: value,
      });
    }
  }
}
