import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class RuffierId {
  public value: string;
  private campo = 'ruffier_id';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID del ruffier es necesario',
        campo: this.campo,
      });

    if (value === '') {
      throw new BadRequest({
        message: 'El ID del ruffier debe de ser un string',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static retornoVacio(): RuffierId {
    // This method will be replaced by auto-generated ID in the database
    return new RuffierId('Firebase remplazará con un ID');
  }
}
