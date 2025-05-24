import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class PromocionDescripcion {
  public value: string;
  private campo = 'nombre';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'La descripción es necesaria',
        campo: this.campo,
        data: value,
      });

    if (value.length < 3)
      throw new BadRequest({
        message: 'La descripción debe ser de al menos 3 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 200)
      throw new BadRequest({
        message: 'La descripción debe ser menos de 200 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
