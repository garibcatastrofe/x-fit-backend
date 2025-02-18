import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class PromocionDescuento {
  public value: number;
  private campo = 'descuento';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'El descuento es necesario',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'El descuento tiene que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'El descuento no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
  }
}
