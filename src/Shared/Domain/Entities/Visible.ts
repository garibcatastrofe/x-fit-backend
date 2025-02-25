import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { VISIBLE, VisibleType } from '../Interfaces/Visible';

export class Visible {
  public value: string;
  private campo = 'visible';
  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message: 'Favor de seleccionar visible',
        campo: this.campo,
      });
    }
    if (!VISIBLE.includes(value as VisibleType)) {
      throw new BadRequest({
        message: 'Favor de seleccionar un valor válido de visible: SI o NO',
        campo: this.campo,
        data: value,
      });
    }
  }
}
