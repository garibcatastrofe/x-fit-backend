import { Ejercicio } from '../../Domain/Entities/Ejercicio';
import { EjercicioId } from '../../Domain/Entities/EjercicioId';
import { EjercicioNombre } from '../../Domain/Entities/EjercicioNombre';
import { EjercicioDescripcion } from '../../Domain/Entities/EjercicioDescripcion';
import { EjercicioRepeticiones } from '../../Domain/Entities/EjercicioRepeticiones';
import { EjercicioDescanso } from '../../Domain/Entities/EjercicioDescanso';
import { EjercicioEjecucion } from '../../Domain/Entities/EjercicioEjecucion';
import { EjercicioTempo } from '../../Domain/Entities/EjercicioTempo';
import { GrupoMuscular } from '@/src/Shared/Domain/Entities/GrupoMuscular';
import { EjercicioRepository } from '../../Domain/Entities/EjercicioRepository';
import { EjercicioCreateDto } from '../../Domain/Interfaces/EjercicioCreateDto';

export class CreateEjercicio {
  public constructor(private readonly ejercicioRepo: EjercicioRepository) {}

  public async run({
    id,
    nombre,
    descripcion,
    repeticiones,
    descanso,
    ejecucion,
    tempo,
    grupo_muscular,
  }: EjercicioCreateDto): Promise<void> {
    const nuevoEjercicio = new Ejercicio(
      id ? new EjercicioId(id) : EjercicioId.retornoVacio(),
      new EjercicioNombre(nombre),
      new EjercicioDescripcion(descripcion),
      new EjercicioRepeticiones(repeticiones),
      new EjercicioDescanso(descanso),
      new EjercicioEjecucion(ejecucion),
      new EjercicioTempo(tempo),
      new GrupoMuscular(grupo_muscular),
    );
    await this.ejercicioRepo.create(nuevoEjercicio.toEjercicioPrimitive());
  }
}
