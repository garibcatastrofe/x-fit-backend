import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class EjercicioRepeticiones {
  public value: string;
  private campo = 'repeticiones';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'Las repeticiones son necesarias',
        campo: this.campo,
        data: value,
      });

    if (value.length < 1)
      throw new BadRequest({
        message: 'Las repeticiones deben de ser de al menos 1 caracter',
        campo: this.campo,
        data: value,
      });

    if (value.length > 5)
      throw new BadRequest({
        message: 'Las repeticiones deben ser 5 caracteres o menos',
        campo: this.campo,
        data: value,
      });
  }
}
