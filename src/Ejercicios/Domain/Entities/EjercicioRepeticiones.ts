import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class EjercicioRepeticiones {
  public value: string;
  private campo = 'repeticiones';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value)
      throw new BadRequest({
        message: 'Las repeticiones son necesarias',
        campo: this.campo,
        data: value,
      });

    if (value !== 'Sin repeticiones') {
      if (value.length < 3 || value.length > 5) {
        throw new BadRequest({
          message: 'Las repeticiones deben tener el formato X-X, donde X es un número entre 1 y 99',
          campo: this.campo,
          data: value,
        });
      }

      const regex = /^(\d{1,2})-(\d{1,2})$/;
      const match = value.match(regex);

      if (!match) {
        throw new BadRequest({
          message:
            'Las repeticiones deben estar en el formato X-X, donde X es un número entre 1 y 99',
          campo: this.campo,
          data: value,
        });
      }

      const [, n1, n2] = match.map(Number);

      if ([n1, n2].some(n => isNaN(n) || n < 1 || n > 99)) {
        throw new BadRequest({
          message: 'Cada número en las repeticiones debe estar entre 1 y 99',
          campo: this.campo,
          data: value,
        });
      }
    }
  }
}
