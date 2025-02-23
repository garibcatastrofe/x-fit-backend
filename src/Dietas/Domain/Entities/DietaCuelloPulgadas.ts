import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class DietaCuelloPulgadas {
  public value: number;
  private campo = 'cuello_pulgadas';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'El cuello en in es necesario',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'El cuello en in tiene que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'El cuello en in no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
    if (value > 100) {
      throw new BadRequest({
        message: 'El cuello en in no tiene que ser mayor a 100',
        campo: this.campo,
        data: value,
      });
    }
  }
}
