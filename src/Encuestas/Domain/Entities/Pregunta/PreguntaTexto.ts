import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class PreguntaTexto {
  public value: string;
  private campo = 'texto';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El texto es necesario',
        campo: this.campo,
        data: value,
      });

    if (value.length < 3)
      throw new BadRequest({
        message: 'El texto debe ser de al menos 3 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 500)
      throw new BadRequest({
        message: 'El texto debe ser menor de 50 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
