import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { SESION, SesionType } from '../Interfaces/Sesion';

export class ReporteSesion {
  public value: string;
  private campo = 'sesion';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message:
          'Favor de Seleccionar una opción para sesion: SESION 1, SESION 2, SESION 3, SESION 4, SESION 5, SESION 6 o SESION 7',
        campo: this.campo,
      });
    }
    if (!SESION.includes(value as SesionType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido para sesion: SESION 1, SESION 2, SESION 3, SESION 4, SESION 5, SESION 6 o SESION 7',
        campo: this.campo,
        data: value,
      });
    }
  }
}
