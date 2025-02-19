import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class PonchadaId {
  public value: number;
  private campo = 'ponchada_id';

  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID de la ponchada es necesario',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'El ID de la ponchada debe de ser un número',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static random(): PonchadaId {
    // This method will be replaced by auto-generated ID in the database
    return new PonchadaId(1);
  }
}
