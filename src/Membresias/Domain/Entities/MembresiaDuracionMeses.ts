import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class MembresiaDuracionMeses {
  public value: number;
  private campo = 'duracionMeses';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'La duracion es necesaria',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'La duracion tiene que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'La duracion no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
  }
}