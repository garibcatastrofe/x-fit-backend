import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { GRUPO_MUSCULAR, GrupoMuscularType } from '../Interfaces/GrupoMuscular';

export class EjercicioGrupoMuscular {
  public value: string;
  private campo = 'grupo_muscular';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message:
          'Favor de Seleccionar una opción para grupo_muscular: PECTORAL, ESPALDA, TRAPECIO, DELTOIDES ANTERIOR, DELTOIDES MEDIO,DELTOIDES POSTERIOR, TRICEPS, BICEPS, ANTEBRAZO, ABDOMEN, GLUTEOS, CUADRICEPS, ISQUIOSURALES, PANTORRILLAS, ADUCTORES, CARDIOVASCULAR, CALENTAMIENTO',
        campo: this.campo,
      });
    }
    if (!GRUPO_MUSCULAR.includes(value as GrupoMuscularType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido para grupo_muscular: PECTORAL, ESPALDA, TRAPECIO, DELTOIDES ANTERIOR, DELTOIDES MEDIO,DELTOIDES POSTERIOR, TRICEPS, BICEPS, ANTEBRAZO, ABDOMEN, GLUTEOS, CUADRICEPS, ISQUIOSURALES, PANTORRILLAS, ADUCTORES, CARDIOVASCULAR, CALENTAMIENTO',
        campo: this.campo,
        data: value,
      });
    }
  }
}
