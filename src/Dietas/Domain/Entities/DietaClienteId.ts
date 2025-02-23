import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class DietaClienteId {
  public value: number;
  private campo = 'id_cliente';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'El id del cliente es necesario',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'El id del cliente tiene que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'El id del cliente no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
  }
}
