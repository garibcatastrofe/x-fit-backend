import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class EncuestaId {
  public value: string;
  private campo = 'encuesta_id';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID de la encuesta es necesario',
        campo: this.campo,
      });

    if (value === '') {
      throw new BadRequest({
        message: 'El ID de la encuesta debe de ser un string',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static retornoVacio(): EncuestaId {
    // This method will be replaced by auto-generated ID in the database
    return new EncuestaId('Firebase remplazará con un ID');
  }
}
