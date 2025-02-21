import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class AlimentoId {
  public value: string;
  private campo = 'alimento_id';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID del alimento es necesario',
        campo: this.campo,
      });

    if (value === "") {
      throw new BadRequest({
        message: 'El ID del alimento debe de ser un string',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static retornoVacio(): AlimentoId {
    // This method will be replaced by auto-generated ID in the database
    return new AlimentoId("Firebase remplazará con un ID");
  }
}
