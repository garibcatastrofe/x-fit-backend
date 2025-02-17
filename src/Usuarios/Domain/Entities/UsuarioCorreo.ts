import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class UsuarioCorreo {
  public value: string;
  private campo = 'correo';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El correo es necesario',
        campo: this.campo,
        data: value,
      });

    if (value.length < 5)
      throw new BadRequest({
        message: 'El correo debe de ser mayor a 5 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 100)
      throw new BadRequest({
        message: 'El correo debe de ser menor a 100 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
