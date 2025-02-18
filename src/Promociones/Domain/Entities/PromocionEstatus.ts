import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { ESTATUS, EstatusType } from '../../../Shared/Infrastructure/Utils/Constants/Estatus';

export class PromocionEstatus {
  public value: string;
  private campo = 'estatus';
  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message: 'Favor de Seleccionar un estatus: ACTIVO o INACTIVO',
        campo: this.campo,
      });
    }
    if (!ESTATUS.includes(value as EstatusType)) {
      throw new BadRequest({
        message: 'Favor de seleccionar un valor válido de estatus: ACTIVO o INACTIVO',
        campo: this.campo,
        data: value,
      });
    }
  }
}
