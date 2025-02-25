import { RutinaPrimitive } from '../Interfaces/RutinaPrimitive';
import { RutinaId } from './RutinaId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { EmpleadoId } from '@/src/Empleados/Domain/Entities/EmpleadoId';
import { RutinaFechaCreacion } from './RutinaFechaCreacion';
import { RutinaObjetivo } from './RutinaObjetivo';
import { Visible } from '@/src/Shared/Domain/Entities/Visible';
import { BloquesRutina } from './Bloques/BloquesRutina';
import { DatosEspecificosGrupoMuscularRutina } from './DatosEspecificosGrupoMuscular/DatosEspecificosGrupoMuscularRutina';
import { ObjetivoType } from '../Interfaces/Objetivo';
import { VisibleType } from '@/src/Shared/Domain/Interfaces/Visible';

export class Rutina {
  public rutinaId: RutinaId;
  public rutinaClienteId: ClienteId;
  public rutinaEmpleadoId: EmpleadoId;
  public rutinaFechaCreacion: RutinaFechaCreacion;
  public rutinaObjetivo: RutinaObjetivo;
  public rutinaVisible: Visible;
  public rutinaBloques: BloquesRutina;
  public rutinaDatos: DatosEspecificosGrupoMuscularRutina;

  public constructor(
    id: RutinaId,
    cliente_id: ClienteId,
    empleado_id: EmpleadoId,
    fecha_creacion: RutinaFechaCreacion,
    objetivo: RutinaObjetivo,
    visible: Visible,
    bloques: BloquesRutina,
    datos: DatosEspecificosGrupoMuscularRutina,
  ) {
    this.rutinaId = id;
    this.rutinaClienteId = cliente_id;
    this.rutinaEmpleadoId = empleado_id;
    this.rutinaFechaCreacion = fecha_creacion;
    this.rutinaObjetivo = objetivo;
    this.rutinaVisible = visible;
    this.rutinaBloques = bloques;
    this.rutinaDatos = datos;
  }

  public toRutinaPrimitive(): RutinaPrimitive {
    return {
      id: this.rutinaId.value,
      id_cliente: this.rutinaClienteId.value,
      id_empleado: this.rutinaEmpleadoId.value,
      fecha_creacion: this.rutinaFechaCreacion.value,
      objetivo: this.rutinaObjetivo.value as ObjetivoType,
      visible: this.rutinaVisible.value as VisibleType,
      bloques: this.rutinaBloques.toPrimitive(),
      datos_especificos_grupo_muscular: this.rutinaDatos.toPrimitive(),
    };
  }
}
