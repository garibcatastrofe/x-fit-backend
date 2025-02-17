import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class UsuarioFechaNacimiento {
  public value: Date;
  private campo = 'fechaNacimiento';

  public constructor(value: string | Date) {
    this.ensureIsValid(value);
    this.value = value instanceof Date ? value : new Date(value);
  }

  private ensureIsValid(value: string | Date): void {
    if (!value) {
      throw new BadRequest({
        message: 'La fecha de nacimiento es requerida',
        campo: this.campo,
      });
    }

    let dateStr: string;
    if (value instanceof Date) {
      dateStr = value.toISOString().split('T')[0];
    } else {
      dateStr = value;
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) {
      throw new BadRequest({
        message: 'La fecha debe estar en formato YYYY-MM-DD (ejemplo: 2024-02-11)',
        campo: this.campo,
        data: dateStr,
      });
    }

    // Validar que la fecha sea válida
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new BadRequest({
        message: 'La fecha ingresada no es válida',
        campo: this.campo,
        data: dateStr,
      });
    }
  }
}