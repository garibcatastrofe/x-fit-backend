import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class EjercicioDescripcion {
  public value: string;
  private campo = 'descripcion';

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

    if (value.length < 30)
      throw new BadRequest({
        message: 'La descripción debe ser de al menos 30 caracteres',
        campo: this.campo,
        data: value,
      });

    if (value.length > 750)
      throw new BadRequest({
        message: 'La descripción debe ser menos de 750 caracteres',
        campo: this.campo,
        data: value,
      });
  }
}
