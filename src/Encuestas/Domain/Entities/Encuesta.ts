import { EncuestaPrimitive } from '../Interfaces/EncuestaPrimitive';
import { EncuestaId } from './EncuestaId';
import { EmpleadoId } from '@/src/Empleados/Domain/Entities/EmpleadoId';
import { EncuestaFecha } from './EncuestaFecha';
import { EncuestaNombre } from './EncuestaNombre';
import { Pregunta } from './Pregunta/Pregunta';

export class Encuesta {
  public encuestaId: EncuestaId;
  public encuestaEmpleadoId: EmpleadoId;
  public encuestaFecha: EncuestaFecha;
  public encuestaNombre: EncuestaNombre;
  public encuestaPreguntas: Pregunta[];

  public constructor(
    id: EncuestaId,
    empleado_id: EmpleadoId,
    fecha: EncuestaFecha,
    nombre: EncuestaNombre,
    preguntas: Pregunta[],
  ) {
    this.encuestaId = id;
    this.encuestaEmpleadoId = empleado_id;
    this.encuestaFecha = fecha;
    this.encuestaNombre = nombre;
    this.encuestaPreguntas = preguntas;
  }

  public toEncuestaPrimitive(): EncuestaPrimitive {
    return {
      id: this.encuestaId.value,
      id_empleado: this.encuestaEmpleadoId.value,
      fecha: this.encuestaFecha.value,
      nombre: this.encuestaNombre.value,
      preguntas: this.encuestaPreguntas.map(p => p.toPrimitive()),
    };
  }
}
