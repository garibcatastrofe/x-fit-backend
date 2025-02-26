import { PreguntaId } from './PreguntaId';
import { PreguntaTipoPregunta } from './PreguntaTipoPregunta';
import { PreguntaTipoRespuesta } from './PreguntaTipoRespuesta';
import { PreguntaTexto } from './PreguntaTexto';
import { PreguntaOpciones } from './PreguntaOpciones';
import { Pregunta as P } from '../../Interfaces/EncuestaPrimitive';
import { TipoPreguntaType } from '../../Interfaces/TipoPregunta';
import { TipoRespuestaType } from '../../Interfaces/TipoRespuesta';

export class Pregunta {
  public preguntaId: PreguntaId;
  public preguntaTipoPregunta: PreguntaTipoPregunta;
  public preguntaTipoRespuesta: PreguntaTipoRespuesta;
  public preguntaTexto: PreguntaTexto;
  public preguntaOpciones: PreguntaOpciones;

  public constructor(
    preguntaId: PreguntaId,
    preguntaTipoPregunta: PreguntaTipoPregunta,
    preguntaTipoRespuesta: PreguntaTipoRespuesta,
    preguntaTexto: PreguntaTexto,
    preguntaOpciones: PreguntaOpciones,
  ) {
    this.preguntaId = preguntaId;
    this.preguntaTipoPregunta = preguntaTipoPregunta;
    this.preguntaTipoRespuesta = preguntaTipoRespuesta;
    this.preguntaTexto = preguntaTexto;
    this.preguntaOpciones = preguntaOpciones;
  }

  public toPrimitive(): P {
    return {
      id_pregunta: this.preguntaId.value,
      tipo_pregunta: this.preguntaTipoPregunta.value as TipoPreguntaType,
      tipo_respuesta: this.preguntaTipoRespuesta.value as TipoRespuestaType,
      texto: this.preguntaTexto.value,
      opciones: this.preguntaOpciones.opciones,
    };
  }
}
