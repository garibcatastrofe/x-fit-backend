import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class DietaPesoKilogramos {
  public value: number;
  private campo = 'peso_kilogramos';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'El peso en kg es necesario',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'El peso en kg tiene que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'El peso en kg no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
    if (value > 500) {
      throw new BadRequest({
        message: 'El peso en kg no tiene que ser mayor a 500',
        campo: this.campo,
        data: value,
      });
    }
  }
}
