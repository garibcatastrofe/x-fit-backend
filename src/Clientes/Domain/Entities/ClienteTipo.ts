import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { TIPO, TipoType } from '../Interfaces/Tipo';

export class ClienteTipo {
  public value: string;
  private campo = 'tipo';
  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message: 'Favor de Seleccionar un tipo',
        campo: this.campo,
      });
    }
    if (!TIPO.includes(value as TipoType)) {
      throw new BadRequest({
        message: 'Favor de seleccionar un valor válido de tipo: PERSONALIZADO o NORMAL',
        campo: this.campo,
        data: value,
      });
    }
  }
}
