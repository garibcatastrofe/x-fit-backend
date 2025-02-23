import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class DietaCaderaPulgadas {
  public value: number;
  private campo = 'cadera_pulgadas';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'La cadera en in es necesaria',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'La cadera en in tiene que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'La cadera en in no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
    if (value > 300) {
      throw new BadRequest({
        message: 'La cadera en in no tiene que ser mayor a 300',
        campo: this.campo,
        data: value,
      });
    }
  }
}
