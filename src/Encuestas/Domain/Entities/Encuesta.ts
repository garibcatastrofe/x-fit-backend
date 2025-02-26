import { EncuestaPrimitive } from '../Interfaces/EncuestaPrimitive';
import { EncuestaId } from './EncuestaId';
import { EmpleadoId } from '@/src/Empleados/Domain/Entities/EmpleadoId';
import { EncuestaFecha } from './EncuestaFecha';
import { Pregunta } from './Pregunta/Pregunta';

export class Encuesta {
  public encuestaId: EncuestaId;
  public encuestaEmpleadoId: EmpleadoId;
  public encuestaFecha: EncuestaFecha;
  public encuestaPreguntas: Pregunta[];

  public constructor(
    id: EncuestaId,
    empleado_id: EmpleadoId,
    fecha: EncuestaFecha,
    preguntas: Pregunta[],
  ) {
    this.encuestaId = id;
    this.encuestaEmpleadoId = empleado_id;
    this.encuestaFecha = fecha;
    this.encuestaPreguntas = preguntas;
  }

  public toEncuestaPrimitive(): EncuestaPrimitive {
    return {
      id: this.encuestaId.value,
      id_empleado: this.encuestaEmpleadoId.value,
      fecha: this.encuestaFecha.value,
      preguntas: this.encuestaPreguntas.map(p => p.toPrimitive()),
    };
  }
}
