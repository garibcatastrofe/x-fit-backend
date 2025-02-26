import { RespuestaPrimitive } from '../Interfaces/RespuestaPrimitive';
import { RespuestaId } from './RespuestaId';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';
import { EncuestaId } from '@/src/Encuestas/Domain/Entities/EncuestaId';
import { RespuestaFecha } from './RespuestaFecha';
import { Respuesta as R } from './RespuestaP/Respuesta';

export class Respuesta {
  public respuestaId: RespuestaId;
  public respuestaUsuarioId: UsuarioId;
  public respuestaEncuestaId: EncuestaId;
  public respuestaFecha: RespuestaFecha;
  public respuestaRespuestas: R[];

  public constructor(
    id: RespuestaId,
    usuario_id: UsuarioId,
    encuesta_id: EncuestaId,
    fecha: RespuestaFecha,
    respuestas: R[],
  ) {
    this.respuestaId = id;
    this.respuestaUsuarioId = usuario_id;
    this.respuestaEncuestaId = encuesta_id;
    this.respuestaFecha = fecha;
    this.respuestaRespuestas = respuestas;
  }

  public toRespuestaPrimitive(): RespuestaPrimitive {
    return {
      id: this.respuestaId.value,
      id_usuario: this.respuestaUsuarioId.value,
      id_encuesta: this.respuestaEncuestaId.value,
      fecha: this.respuestaFecha.value,
      respuestas: this.respuestaRespuestas.map(resp => resp.toPrimitive()),
    };
  }
}
