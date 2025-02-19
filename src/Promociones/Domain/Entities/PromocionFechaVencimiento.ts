import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class PromocionFechaVencimiento {
  public value: string;
  private campo = 'fecha_vencimiento';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string | Date): void {
    if (!value) {
      throw new BadRequest({
        message: 'La fecha de vencimiento es requerida',
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
