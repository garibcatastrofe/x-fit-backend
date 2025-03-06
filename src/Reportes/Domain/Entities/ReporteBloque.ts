import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { BLOQUE, BloqueType } from '../Interfaces/Bloque';

export class ReporteBloque {
  public value: string;
  private campo = 'bloque';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message: 'Favor de Seleccionar una opción para bloque: BLOQUE I, BLOQUE II o BLOQUE III',
        campo: this.campo,
      });
    }
    if (!BLOQUE.includes(value as BloqueType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido para bloque: BLOQUE I, BLOQUE II o BLOQUE III',
        campo: this.campo,
        data: value,
      });
    }
  }
}
