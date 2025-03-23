import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { TIPO, TipoType } from '../Interfaces/Tipo';

export class MembresiaTipo {
  public value: string;
  private campo = 'tipo';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message: 'Favor de Seleccionar una opción para tipo: GRUPAL o INDIVIDUAL',
        campo: this.campo,
      });
    }
    if (!TIPO.includes(value as TipoType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido de tipo: GRUPAL o INDIVIDUAL',
        campo: this.campo,
        data: value,
      });
    }
  }
}
