import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class RuffierFecha {
  public value: Date;
  private campo = 'fecha';

  public constructor(value: Date) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: Date): void {
    if (!value) {
      throw new BadRequest({
        message: 'La fecha y hora de fecha son requeridas',
        campo: this.campo,
      });
    }

    let dateStr: string;
    if (value instanceof Date) {
      dateStr = value.toISOString();
    } else {
      dateStr = value;
    }

    // Expresión regular para validar fecha con hora (YYYY-MM-DD HH:MM:SS)
    const regex = /^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(:\d{2})?)?$/;
    if (!regex.test(dateStr)) {
      throw new BadRequest({
        message:
          'La fecha debe estar en formato YYYY-MM-DD HH:MM:SS (ejemplo: 2024-02-11 14:30:00)',
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
