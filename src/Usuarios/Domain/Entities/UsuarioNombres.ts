import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class UsuarioNombres {
  public value: string;
  private campo = 'nombres';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'Los nombres son necesarios',
        campo: this.campo,
        data: value,
      });

    if (value.length < 3)
      throw new BadRequest({
        message: 'Los nombres deben ser al menos 3 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 50)
      throw new BadRequest({
        message: 'Los nombres debe ser menos de 50 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
