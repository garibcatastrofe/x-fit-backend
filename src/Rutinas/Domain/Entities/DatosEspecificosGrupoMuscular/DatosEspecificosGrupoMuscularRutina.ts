import { DatoEspecifico } from './DatoEspecificoRutina';
import { DatosEspecificosGrupoMuscular } from '../../Interfaces/RutinaPrimitive';
import { ObjetivoPrograma } from './ObjetivoPrograma';

export class DatosEspecificosGrupoMuscularRutina {
  public objetivo_programa: ObjetivoPrograma;
  public grupo_muscular: DatoEspecifico[];

  public constructor(objetivo_programa: ObjetivoPrograma, grupo_muscular: DatoEspecifico[]) {
    this.objetivo_programa = objetivo_programa;
    this.grupo_muscular = grupo_muscular;
  }

  public toPrimitive(): DatosEspecificosGrupoMuscular {
    return {
      objetivo_programa: this.objetivo_programa.value,
      grupo_muscular: this.grupo_muscular.map(grupo => grupo.toPrimitive()),
    };
  }
}
