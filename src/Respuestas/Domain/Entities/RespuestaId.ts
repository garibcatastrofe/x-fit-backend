import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class RespuestaId {
  public value: string;
  private campo = 'respuesta_id';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID de la respuesta es necesario',
        campo: this.campo,
      });

    if (value === '') {
      throw new BadRequest({
        message: 'El ID de la respuesta debe de ser un string',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static retornoVacio(): RespuestaId {
    // This method will be replaced by auto-generated ID in the database
    return new RespuestaId('Firebase remplazará con un ID');
  }
}
