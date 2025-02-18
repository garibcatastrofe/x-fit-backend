import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class MembresiaDescripcion {
  public value: string;
  private campo = 'descripcion';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'La descripcion es necesaria',
        campo: this.campo,
        data: value,
      });

    if (value.length < 25)
      throw new BadRequest({
        message: 'La descripcion debe tener al menos 25 caracteres ',
        campo: this.campo,
        data: value,
      });

    if (value.length > 200)
      throw new BadRequest({
        message: 'Los apellidos debe ser menos de 200 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
