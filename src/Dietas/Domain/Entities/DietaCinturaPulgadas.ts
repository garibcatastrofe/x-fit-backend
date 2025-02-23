import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class DietaCinturaPulgadas {
  public value: number;
  private campo = 'cintura_pulgadas';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'La cintura en in es necesaria',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'La cintura en in tiene que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'La cintura en 0 no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
    if (value > 200) {
      throw new BadRequest({
        message: 'La cintura en in no tiene que ser mayor a 200',
        campo: this.campo,
        data: value,
      });
    }
  }
}
