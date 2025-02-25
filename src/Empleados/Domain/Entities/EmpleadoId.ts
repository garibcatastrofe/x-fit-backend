import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class EmpleadoId {
  public value: number;
  private campo = 'empleado_id';

  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID del empleado es necesario',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'El ID del empleado debe de ser un número',
        campo: this.campo,
        data: value,
      });
    }

    if (value < 0) {
      throw new BadRequest({
        message: 'El id del cliente no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static random(): EmpleadoId {
    // This method will be replaced by auto-generated ID in the database
    return new EmpleadoId(1);
  }
}
