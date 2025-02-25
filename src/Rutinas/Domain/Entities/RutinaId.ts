import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class RutinaId {
  public value: string;
  private campo = 'rutina_id';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID de la rutina es necesario',
        campo: this.campo,
      });

    if (value === '') {
      throw new BadRequest({
        message: 'El ID de la rutina debe de ser un string',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static retornoVacio(): RutinaId {
    // This method will be replaced by auto-generated ID in the database
    return new RutinaId('Firebase remplazará con un ID');
  }
}
