import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class EjercicioId {
  public value: string;
  private campo = 'ejercicio_id';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID del ejercicio es necesario',
        campo: this.campo,
      });

    if (value === '') {
      throw new BadRequest({
        message: 'El ID del ejercicio debe de ser un string',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static retornoVacio(): EjercicioId {
    // This method will be replaced by auto-generated ID in the database
    return new EjercicioId('Firebase remplazará con un ID');
  }
}
