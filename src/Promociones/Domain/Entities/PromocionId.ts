import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class PromocionId {
  public value: number;
  private campo = 'promocion_id';

  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID de la promoción es necesario',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'El ID de la promoción debe de ser un número',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static random(): PromocionId {
    // This method will be replaced by auto-generated ID in the database
    return new PromocionId(1);
  }
}
