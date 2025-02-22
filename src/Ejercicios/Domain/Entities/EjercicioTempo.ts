import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class EjercicioTempo {
  public value: string;
  private campo = 'tempo';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'El tempo es necesario',
        campo: this.campo,
        data: value,
      });

    if (value !== 'Sin tempo') {
      if (value.length !== 7)
        throw new BadRequest({
          message: 'El tempo debe tener 7 caracteres de la forma 0-0-0-0',
          campo: this.campo,
          data: value,
        });

      const regex = /^(\d)-(\d)-(\d)-(\d)$/;
      const match = value.match(regex);

      if (!match)
        throw new BadRequest({
          message: 'El tempo debe estar en el formato 0-0-0-0',
          campo: this.campo,
          data: value,
        });

      // Extraer los números y asegurarse de que estén entre 0 y 9 (ya garantizado por la regex)
      const [, n1, n2, n3, n4] = match.map(Number);

      if ([n1, n2, n3, n4].some(n => isNaN(n) || n < 0 || n > 9)) {
        throw new BadRequest({
          message: 'Cada número en el tempo debe estar entre 0 y 9',
          campo: this.campo,
          data: value,
        });
      }
    }
  }
}
