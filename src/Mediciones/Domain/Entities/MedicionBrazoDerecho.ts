import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class MedicionBrazoDerecho {
  public value: number;
  private campo = 'brazo_derecho';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'La medida del brazo derecho es necesaria',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'La medida del brazo derecho tiene que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'La medida del brazo derecho no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
    if (value > 500) {
      throw new BadRequest({
        message: 'La medida del brazo derecho no tiene que ser mayor a 500',
        campo: this.campo,
        data: value,
      });
    }
  }
}
