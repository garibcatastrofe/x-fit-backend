import { Serie as S } from '../../Interfaces/ReportePrimitive'
import { EjercicioCarga } from './EjercicioCarga'
import { EjercicioRepeticiones } from './EjercicioRepeticiones'

export class Serie {
  public carga: EjercicioCarga
  public repeticiones: EjercicioRepeticiones

  public constructor(carga: EjercicioCarga, repeticiones: EjercicioRepeticiones) {
    this.carga = carga
    this.repeticiones = repeticiones
  }

  public toPrimitive() : S {
    return {
      carga: this.carga.value,
      repeticiones: this.repeticiones.value
    }
  }
}