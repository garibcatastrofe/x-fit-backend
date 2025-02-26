import { Encuesta } from '../../Domain/Entities/Encuesta';
import { EncuestaId } from '../../Domain/Entities/EncuestaId';
import { EmpleadoId } from '@/src/Empleados/Domain/Entities/EmpleadoId';
import { EncuestaFecha } from '../../Domain/Entities/EncuestaFecha';
import { Pregunta } from '../../Domain/Entities/Pregunta/Pregunta';
import { EncuestaRepository } from '../../Domain/Entities/EncuestaRepository';
import { PreguntaId } from '../../Domain/Entities/Pregunta/PreguntaId';
import { PreguntaTipoPregunta } from '../../Domain/Entities/Pregunta/PreguntaTipoPregunta';
import { PreguntaTipoRespuesta } from '../../Domain/Entities/Pregunta/PreguntaTipoRespuesta';
import { PreguntaTexto } from '../../Domain/Entities/Pregunta/PreguntaTexto';
import { PreguntaOpciones } from '../../Domain/Entities/Pregunta/PreguntaOpciones';
import { EncuestaPrimitive } from '../../Domain/Interfaces/EncuestaPrimitive';

export class UpdateEncuesta {
  public constructor(private readonly encuestaRepo: EncuestaRepository) {}

  public async run(id: string, encuesta: EncuestaPrimitive): Promise<void> {
    const encuestaId = new EncuestaId(id);

    const newEncuesta = new Encuesta(
      id ? new EncuestaId(id) : EncuestaId.retornoVacio(),
      new EmpleadoId(encuesta.id_empleado),
      new EncuestaFecha(encuesta.fecha),
      encuesta.preguntas.map(
        p =>
          new Pregunta(
            new PreguntaId(p.id_pregunta),
            new PreguntaTipoPregunta(p.tipo_pregunta),
            new PreguntaTipoRespuesta(p.tipo_respuesta),
            new PreguntaTexto(p.texto),
            new PreguntaOpciones(p.opciones),
          ),
      ),
    );

    await this.encuestaRepo.update(encuestaId.value, newEncuesta.toEncuestaPrimitive());
  }
}
