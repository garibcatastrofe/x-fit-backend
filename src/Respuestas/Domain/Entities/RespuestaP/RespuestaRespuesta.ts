import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class RespuestaRespuesta {
  public value: string;
  private campo = 'respuesta';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'La respuesta es necesario',
        campo: this.campo,
        data: value,
      });

    if (value.length < 3)
      throw new BadRequest({
        message: 'La respuesta debe ser de al menos 3 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 500)
      throw new BadRequest({
        message: 'La respuesta debe ser menor de 500 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
