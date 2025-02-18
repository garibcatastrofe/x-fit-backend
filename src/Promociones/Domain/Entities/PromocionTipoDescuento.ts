import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { TIPO_DESCUENTO, TipoDescuentoType } from '../Interfaces/TipoDescuento';

export class PromocionTipoDescuento {
  public value: string;
  private campo = 'tipo_descuento';
  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message: 'Favor de Seleccionar un tipo de descuento: PORCENTAJE o MONTO FIJO',
        campo: this.campo,
      });
    }
    if (!TIPO_DESCUENTO.includes(value as TipoDescuentoType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido de tipo descuento: PORCENTAJE o MONTO FIJO',
        campo: this.campo,
        data: value,
      });
    }
  }
}
