import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class UsuarioTelefono {
  public value: string;
  private campo = 'telefono';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El teléfono es necesario',
        campo: this.campo,
        data: value,
      });

    if (value.length < 10)
      throw new BadRequest({
        message: 'El teléfono debe ser de 10 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 12)
      throw new BadRequest({
        message: 'El teléfono debe ser menos de 12 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
