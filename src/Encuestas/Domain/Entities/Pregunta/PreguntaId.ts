import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { v4 as uuidv4 } from 'uuid';

export class PreguntaId {
  public value: string;
  private campo = 'id_pregunta';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID de la pregunta es necesario',
        campo: this.campo,
      });

    if (value === '') {
      throw new BadRequest({
        message: 'El ID de la pregunta debe de ser un string',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static retornoVacio(): PreguntaId {
    // This method will be replaced by auto-generated ID in the database
    return new PreguntaId(uuidv4());
  }
}
