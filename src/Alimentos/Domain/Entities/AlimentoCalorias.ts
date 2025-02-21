import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class AlimentoCalorias {
  public value: number;
  private campo = 'calorias';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    /* if (!value)
      throw new BadRequest({
        message: 'Las calorías del alimento son necesarias',
        campo: this.campo,
      }); */

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'Las calorías tienen que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'Las calorías no tienen que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
  }
}
