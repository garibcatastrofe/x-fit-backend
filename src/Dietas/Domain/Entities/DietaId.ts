import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class DietaId {
  public value: string;
  private campo = 'dieta_id';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID de la dieta es necesario',
        campo: this.campo,
      });

    if (value === '') {
      throw new BadRequest({
        message: 'El ID de la dieta debe de ser un string',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static retornoVacio(): DietaId {
    // This method will be replaced by auto-generated ID in the database
    return new DietaId('Firebase remplazará con un ID');
  }
}
