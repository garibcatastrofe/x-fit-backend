import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class PromocionNombre {
  public value: string;
  private campo = 'nombre';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El nombre es necesario',
        campo: this.campo,
        data: value,
      });

    if (value.length < 3)
      throw new BadRequest({
        message: 'El nombre debe ser de al menos 3 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 50)
      throw new BadRequest({
        message: 'El nombre debe ser menos de 50 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
