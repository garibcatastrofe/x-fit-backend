import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class EjercicioDescanso {
  public value: number;
  private campo = 'descanso';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'El descanso es necesario',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'El descanso tiene que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'El descanso no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
    if (value > 10) {
      throw new BadRequest({
        message: 'El descanso no tiene que ser mayor a 10',
        campo: this.campo,
        data: value,
      });
    }
  }
}
