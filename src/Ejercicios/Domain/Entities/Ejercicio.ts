import { EjercicioPrimitive } from '../Interfaces/EjercicioPrimitive';
import { EjercicioId } from './EjercicioId';
import { EjercicioNombre } from './EjercicioNombre';
import { EjercicioDescripcion } from './EjercicioDescripcion';
import { EjercicioRepeticiones } from './EjercicioRepeticiones';
import { EjercicioDescanso } from './EjercicioDescanso';
import { EjercicioEjecucion } from './EjercicioEjecucion';
import { EjercicioTempo } from './EjercicioTempo';
import { EjercicioGrupoMuscular } from './EjercicioGrupoMuscular';
import { GrupoMuscularType } from '../Interfaces/GrupoMuscular';

export class Ejercicio {
  public ejercicioId: EjercicioId;
  public ejercicioNombre: EjercicioNombre;
  public ejercicioDescripcion: EjercicioDescripcion;
  public ejercicioRepeticiones: EjercicioRepeticiones;
  public ejercicioDescanso: EjercicioDescanso;
  public ejercicioEjecucion: EjercicioEjecucion;
  public ejercicioTempo: EjercicioTempo;
  public ejercicioGrupoMuscular: EjercicioGrupoMuscular;

  public constructor(
    id: EjercicioId,
    nombre: EjercicioNombre,
    descripcion: EjercicioDescripcion,
    repeticiones: EjercicioRepeticiones,
    descanso: EjercicioDescanso,
    ejecucion: EjercicioEjecucion,
    tempo: EjercicioTempo,
    grupo_muscular: EjercicioGrupoMuscular,
  ) {
    this.ejercicioId = id;
    this.ejercicioNombre = nombre;
    this.ejercicioDescripcion = descripcion;
    this.ejercicioRepeticiones = repeticiones;
    this.ejercicioDescanso = descanso;
    this.ejercicioEjecucion = ejecucion;
    this.ejercicioTempo = tempo;
    this.ejercicioGrupoMuscular = grupo_muscular;
  }

  public toEjercicioPrimitive(): EjercicioPrimitive {
    return {
      id: this.ejercicioId.value,
      nombre: this.ejercicioNombre.value,
      descripcion: this.ejercicioDescripcion.value,
      repeticiones: this.ejercicioRepeticiones.value,
      descanso: this.ejercicioDescanso.value,
      ejecucion: this.ejercicioEjecucion.value,
      tempo: this.ejercicioTempo.value,
      grupo_muscular: this.ejercicioGrupoMuscular.value as GrupoMuscularType,
    };
  }
}
