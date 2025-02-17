import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class UsuarioApellidos {
  public value: string;
  private campo = 'apellidos';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'Los apellidos son necesarios',
        campo: this.campo,
        data: value,
      });

    if (value.length < 3)
      throw new BadRequest({
        message: 'Los apellidos deben ser al menos 3 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 50)
      throw new BadRequest({
        message: 'Los apellidos debe ser menos de 50 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
