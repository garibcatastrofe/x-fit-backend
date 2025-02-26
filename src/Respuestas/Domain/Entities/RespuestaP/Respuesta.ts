import { PreguntaId } from '@/src/Encuestas/Domain/Entities/Pregunta/PreguntaId';
import { PreguntaTexto } from '@/src/Encuestas/Domain/Entities/Pregunta/PreguntaTexto';
import { RespuestaRespuesta } from './RespuestaRespuesta';
import { Respuesta as R } from '../../Interfaces/RespuestaPrimitive';

export class Respuesta {
  public respuestaPreguntaId: PreguntaId;
  public respuestaPreguntaTexto: PreguntaTexto;
  public respuestaRespuesta: RespuestaRespuesta;

  public constructor(
    preguntaId: PreguntaId,
    preguntaTexto: PreguntaTexto,
    respuesta: RespuestaRespuesta,
  ) {
    this.respuestaPreguntaId = preguntaId;
    this.respuestaPreguntaTexto = preguntaTexto;
    this.respuestaRespuesta = respuesta;
  }

  public toPrimitive(): R {
    return {
      id_pregunta: this.respuestaPreguntaId.value,
      texto: this.respuestaPreguntaTexto.value,
      respuesta: this.respuestaRespuesta.value,
    };
  }
}
