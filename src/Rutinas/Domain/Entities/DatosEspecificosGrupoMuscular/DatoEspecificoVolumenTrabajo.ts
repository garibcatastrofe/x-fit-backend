import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { VOLUMEN_TRABAJO, VolumenTrabajoType } from '../../Interfaces/VolumenTrabajo';

export class VolumenTrabajo {
  public value: string;
  private campo = 'volumen_trabajo';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message:
          'Favor de Seleccionar una opción para volumen_trabajo: FRECUENCIA DE 1 ACCESORIOS MINIMO, FRECUENCIA DE 1-2 ACCESORIOS MODERADO, FRECUENCIA DE 2 ACCESORIOS SIGNIFICATIVO, FRECUENCIA DE 2-3 ACCESORIOS MODERADO A SIGNIFICATIVO o FRECUENCIA DE 3 ACCESORIOS MODERADO A SIGNIFICATIVO',
        campo: this.campo,
      });
    }
    if (!VOLUMEN_TRABAJO.includes(value as VolumenTrabajoType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido para volumen_trabajo: FRECUENCIA DE 1 ACCESORIOS MINIMO, FRECUENCIA DE 1-2 ACCESORIOS MODERADO, FRECUENCIA DE 2 ACCESORIOS SIGNIFICATIVO, FRECUENCIA DE 2-3 ACCESORIOS MODERADO A SIGNIFICATIVO o FRECUENCIA DE 3 ACCESORIOS MODERADO A SIGNIFICATIVO',
        campo: this.campo,
        data: value,
      });
    }
  }
}
