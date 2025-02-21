import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class AlimentoCarbohidratos {
  public value: number;
  private campo = 'carbohidratos';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
   /*  if (!value)
      throw new BadRequest({
        message: 'Los carbohídratos del alimento son necesarios',
        campo: this.campo,
      }); */

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'Los carbohídratos tienen que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'Los carbohídratos no tienen que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
  }
}
