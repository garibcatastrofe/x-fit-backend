import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { NIVEL_FUERZA, NivelFuerzaType } from '../../Interfaces/NivelFuerza';

export class NivelFuerza {
  public value: string;
  private campo = 'nivel_fuerza';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message:
          'Favor de Seleccionar una opción para nivel_fuerza: CLASE III-VI, CLASE I-II, MASTER-ELITE o ELITE INTERNACIONAL',
        campo: this.campo,
      });
    }
    if (!NIVEL_FUERZA.includes(value as NivelFuerzaType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido para nivel_fuerza: CLASE III-VI, CLASE I-II, MASTER-ELITE o ELITE INTERNACIONAL',
        campo: this.campo,
        data: value,
      });
    }
  }
}
