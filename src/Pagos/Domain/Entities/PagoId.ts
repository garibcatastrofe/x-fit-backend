import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class PagoId {
  public value: number;
  private campo = 'pago_id';

  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID del pago es necesario',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'El ID del pago debe de ser un número',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static random(): PagoId {
    // This method will be replaced by auto-generated ID in the database
    return new PagoId(1);
  }
}
