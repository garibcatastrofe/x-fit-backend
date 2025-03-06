import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class ReporteId {
  public value: string;
  private campo = 'reporte_id';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El ID del reporte es necesario',
        campo: this.campo,
      });

    if (value === '') {
      throw new BadRequest({
        message: 'El ID del reporte debe de ser un string',
        campo: this.campo,
        data: value,
      });
    }
  }
  public static retornoVacio(): ReporteId {
    // This method will be replaced by auto-generated ID in the database
    return new ReporteId('Firebase remplazará con un ID');
  }
}
