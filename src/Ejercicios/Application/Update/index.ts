import { Ejercicio } from '../../Domain/Entities/Ejercicio';
import { EjercicioId } from '../../Domain/Entities/EjercicioId';
import { EjercicioNombre } from '../../Domain/Entities/EjercicioNombre';
import { EjercicioDescripcion } from '../../Domain/Entities/EjercicioDescripcion';
import { EjercicioRepeticiones } from '../../Domain/Entities/EjercicioRepeticiones';
import { EjercicioDescanso } from '../../Domain/Entities/EjercicioDescanso';
import { EjercicioEjecucion } from '../../Domain/Entities/EjercicioEjecucion';
import { EjercicioTempo } from '../../Domain/Entities/EjercicioTempo';
import { EjercicioGrupoMuscular } from '../../Domain/Entities/EjercicioGrupoMuscular';
import { EjercicioRepository } from '../../Domain/Entities/EjercicioRepository';
import { EjercicioPrimitive } from '../../Domain/Interfaces/EjercicioPrimitive';

export class UpdateEjercicio {
  public constructor(private readonly ejercicioRepo: EjercicioRepository) {}

  public async run(id: string, ejercicio: EjercicioPrimitive): Promise<void> {
    const ejercicioId = new EjercicioId(id);
    //const alimentoViejo = await this.alimentoRepo.getById(alimentoId.value);

    const newEjercicio = new Ejercicio(
      new EjercicioId(ejercicioId.value),
      new EjercicioNombre(ejercicio.nombre),
      new EjercicioDescripcion(ejercicio.descripcion),
      new EjercicioRepeticiones(ejercicio.repeticiones),
      new EjercicioDescanso(ejercicio.descanso),
      new EjercicioEjecucion(ejercicio.ejecucion),
      new EjercicioTempo(ejercicio.tempo),
      new EjercicioGrupoMuscular(ejercicio.grupo_muscular),
    );
    await this.ejercicioRepo.update(ejercicioId.value, newEjercicio.toEjercicioPrimitive());
  }
}
