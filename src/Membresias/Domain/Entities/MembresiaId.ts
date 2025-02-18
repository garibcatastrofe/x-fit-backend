import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class MembresiaId {
  public value: number;
  private campo = 'membresia_id';

  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID de la memebresia es necesario',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'El ID de la membresia debe de ser un número',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static random(): MembresiaId {
    // This method will be replaced by auto-generated ID in the database
    return new MembresiaId(1);
  }
}
