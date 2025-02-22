import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class EjercicioEjecucion {
  public value: string;
  private campo = 'ejecucion';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'La url de ejecucion es necesaria',
        campo: this.campo,
        data: value,
      });

    if (value.length < 3)
      throw new BadRequest({
        message: 'La url de ejecucion debe ser de al menos 3 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 255)
      throw new BadRequest({
        message: 'La url de ejecucion debe ser menos de 255 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
