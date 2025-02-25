import { DatoEspecificoPrimitive } from '../../Interfaces/RutinaPrimitive';
import { GrupoMuscular } from '@/src/Shared/Domain/Entities/GrupoMuscular';
import { NivelFuerza } from './DatoEspecificoNivelFuerza';
import { VolumenTrabajo } from './DatoEspecificoVolumenTrabajo';
import { RecuperacionHistorica } from './DatoEspecificoRecuperacionHistorica';
import { GrupoMuscularType } from '@/src/Shared/Domain/Interfaces/GrupoMuscular';
import { NivelFuerzaType } from '../../Interfaces/NivelFuerza';
import { VolumenTrabajoType } from '../../Interfaces/VolumenTrabajo';
import { RecuperacionHistoricaType } from '../../Interfaces/RecuperacionHistorica';

export class DatoEspecifico {
  public nombre_grupo: GrupoMuscular;
  public nivel_fuerza: NivelFuerza;
  public volumen_trabajo: VolumenTrabajo;
  public recuperacion_historica: RecuperacionHistorica;

  public constructor(
    nombre_grupo: GrupoMuscular,
    nivel_fuerza: NivelFuerza,
    volumen_trabajo: VolumenTrabajo,
    recuperacion_historica: RecuperacionHistorica,
  ) {
    this.nombre_grupo = nombre_grupo;
    this.nivel_fuerza = nivel_fuerza;
    this.volumen_trabajo = volumen_trabajo;
    this.recuperacion_historica = recuperacion_historica;
  }

  public toPrimitive(): DatoEspecificoPrimitive {
    return {
      nombre_grupo: this.nombre_grupo.value as GrupoMuscularType,
      nivel_fuerza: this.nivel_fuerza.value as NivelFuerzaType,
      volumen_trabajo: this.volumen_trabajo.value as VolumenTrabajoType,
      recuperacion_historica: this.recuperacion_historica.value as RecuperacionHistoricaType,
    };
  }
}
