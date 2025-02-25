import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class RuffierFcPrevia {
  public value: number;
  private campo = 'fc_previa';
  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: number): void {
    if (!value)
      throw new BadRequest({
        message: 'La fc_previa es necesaria',
        campo: this.campo,
      });

    if (isNaN(value)) {
      throw new BadRequest({
        message: 'La fc_previa tiene que ser un número',
        campo: this.campo,
        data: value,
      });
    }
    if (value < 0) {
      throw new BadRequest({
        message: 'La fc_previa no tiene que ser menor a 0',
        campo: this.campo,
        data: value,
      });
    }
    if (value > 500) {
      throw new BadRequest({
        message: 'La fc_previa no tiene que ser mayor a 500',
        campo: this.campo,
        data: value,
      });
    }
  }
}
