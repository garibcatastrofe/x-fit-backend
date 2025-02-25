import { Rutina } from '../../Domain/Entities/Rutina';
import { RutinaId } from '../../Domain/Entities/RutinaId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { EmpleadoId } from '@/src/Empleados/Domain/Entities/EmpleadoId';
import { RutinaFechaCreacion } from '../../Domain/Entities/RutinaFechaCreacion';
import { RutinaObjetivo } from '../../Domain/Entities/RutinaObjetivo';
import { Visible } from '@/src/Shared/Domain/Entities/Visible';
import { BloquesRutina } from '../../Domain/Entities/Bloques/BloquesRutina';
import { DatosEspecificosGrupoMuscularRutina } from '../../Domain/Entities/DatosEspecificosGrupoMuscular/DatosEspecificosGrupoMuscularRutina';
import { RutinaRepository } from '../../Domain/Entities/RutinaRepository';
import { RutinaCreateDto } from '../../Domain/Interfaces/RutinaCreateDto';
import { Ejercicio } from '../../Domain/Entities/Bloques/Ejercicio';
import { Sesiones } from '../../Domain/Entities/Bloques/Sesion';
import { ObjetivoPrograma } from '../../Domain/Entities/DatosEspecificosGrupoMuscular/ObjetivoPrograma';
import { DatoEspecifico } from '../../Domain/Entities/DatosEspecificosGrupoMuscular/DatoEspecificoRutina';
import { GrupoMuscular } from '@/src/Shared/Domain/Entities/GrupoMuscular';
import { NivelFuerza } from '../../Domain/Entities/DatosEspecificosGrupoMuscular/DatoEspecificoNivelFuerza';
import { VolumenTrabajo } from '../../Domain/Entities/DatosEspecificosGrupoMuscular/DatoEspecificoVolumenTrabajo';
import { RecuperacionHistorica } from '../../Domain/Entities/DatosEspecificosGrupoMuscular/DatoEspecificoRecuperacionHistorica';

export class CreateRutina {
  public constructor(private readonly rutinaRepo: RutinaRepository) {}

  public async run({
    id,
    id_cliente,
    id_empleado,
    fecha_creacion,
    objetivo,
    visible,
    bloques,
    datos_especificos_grupo_muscular,
  }: RutinaCreateDto): Promise<void> {
    const b1_sesion1 = (await Promise.all(
      bloques.bloque_1.sesion_1.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b1_sesion2 = (await Promise.all(
      bloques.bloque_1.sesion_2.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b1_sesion3 = (await Promise.all(
      bloques.bloque_1.sesion_3.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b1_sesion4 = (await Promise.all(
      bloques.bloque_1.sesion_4.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b1_sesion5 = (await Promise.all(
      bloques.bloque_1.sesion_5.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b1_sesion6 = (await Promise.all(
      bloques.bloque_1.sesion_6.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];

    const b2_sesion1 = (await Promise.all(
      bloques.bloque_2.sesion_1.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b2_sesion2 = (await Promise.all(
      bloques.bloque_2.sesion_2.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b2_sesion3 = (await Promise.all(
      bloques.bloque_2.sesion_3.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b2_sesion4 = (await Promise.all(
      bloques.bloque_2.sesion_4.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b2_sesion5 = (await Promise.all(
      bloques.bloque_2.sesion_5.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b2_sesion6 = (await Promise.all(
      bloques.bloque_2.sesion_6.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];

    const b3_sesion1 = (await Promise.all(
      bloques.bloque_3.sesion_1.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b3_sesion2 = (await Promise.all(
      bloques.bloque_3.sesion_2.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b3_sesion3 = (await Promise.all(
      bloques.bloque_3.sesion_3.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b3_sesion4 = (await Promise.all(
      bloques.bloque_3.sesion_4.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b3_sesion5 = (await Promise.all(
      bloques.bloque_3.sesion_5.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];
    const b3_sesion6 = (await Promise.all(
      bloques.bloque_3.sesion_6.map(a => Ejercicio.create(a.id_ejercicio)),
    )) as Ejercicio[];

    const nuevaRutina = new Rutina(
      id ? new RutinaId(id) : RutinaId.retornoVacio(),
      new ClienteId(id_cliente),
      new EmpleadoId(id_empleado),
      new RutinaFechaCreacion(fecha_creacion),
      new RutinaObjetivo(objetivo),
      new Visible(visible),
      new BloquesRutina(
        new Sesiones(b1_sesion1, b1_sesion2, b1_sesion3, b1_sesion4, b1_sesion5, b1_sesion6),
        new Sesiones(b2_sesion1, b2_sesion2, b2_sesion3, b2_sesion4, b2_sesion5, b2_sesion6),
        new Sesiones(b3_sesion1, b3_sesion2, b3_sesion3, b3_sesion4, b3_sesion5, b3_sesion6),
      ),
      new DatosEspecificosGrupoMuscularRutina(
        new ObjetivoPrograma(datos_especificos_grupo_muscular.objetivo_programa),
        datos_especificos_grupo_muscular.grupo_muscular.map(
          grupo =>
            new DatoEspecifico(
              new GrupoMuscular(grupo.nombre_grupo),
              new NivelFuerza(grupo.nivel_fuerza),
              new VolumenTrabajo(grupo.volumen_trabajo),
              new RecuperacionHistorica(grupo.recuperacion_historica),
            ),
        ),
      ),
    );

    await this.rutinaRepo.create(nuevaRutina.toRutinaPrimitive());
  }
}
