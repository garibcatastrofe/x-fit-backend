import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class MedicionId {
  public value: string;
  private campo = 'medicion_id';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID de la medicion es necesario',
        campo: this.campo,
      });

    if (value === '') {
      throw new BadRequest({
        message: 'El ID de la medicion debe de ser un string',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static retornoVacio(): MedicionId {
    // This method will be replaced by auto-generated ID in the database
    return new MedicionId('Firebase remplazará con un ID');
  }
}
