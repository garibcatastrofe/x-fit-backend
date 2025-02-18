import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class EmpleadoPuesto {
  public value: string;
  private campo = 'puesto';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El puesto es necesario',
        campo: this.campo,
        data: value,
      });

    if (value.length < 3)
      throw new BadRequest({
        message: 'El puesto debe ser de al menos 3 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 20)
      throw new BadRequest({
        message: 'El puesto debe ser de menos de 20 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
