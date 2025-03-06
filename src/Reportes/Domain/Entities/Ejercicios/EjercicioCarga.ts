import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class EjercicioCarga {
  public value: number;
  private campo = 'carga';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'La carga necesaria',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'La carga tiene que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'La carga no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
    if (value > 1000) {
      throw new BadRequest({
        message: 'La carga no tiene que ser mayor a 1000',
        campo: this.campo,
        data: value,
      });
    }
  }
}
