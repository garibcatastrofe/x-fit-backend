import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class UsuarioPassword {
  public value: string;
  private campo = 'password';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'La contraseña es necesaria',
        campo: this.campo,
        data: value,
      });

    if (value.length < 5)
      throw new BadRequest({
        message: 'La contraseña debe ser de al menos 5 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 50)
      throw new BadRequest({
        message: 'La contraseña debe ser menos de 50 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
