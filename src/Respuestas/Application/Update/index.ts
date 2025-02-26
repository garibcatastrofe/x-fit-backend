import { Respuesta } from '../../Domain/Entities/Respuesta';
import { RespuestaId } from '../../Domain/Entities/RespuestaId';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';
import { EncuestaId } from '@/src/Encuestas/Domain/Entities/EncuestaId';
import { RespuestaFecha } from '../../Domain/Entities/RespuestaFecha';
import { Respuesta as R } from '../../Domain/Entities/RespuestaP/Respuesta';
import { RespuestaRepository } from '../../Domain/Entities/RespuestaRepository';
import { PreguntaId } from '@/src/Encuestas/Domain/Entities/Pregunta/PreguntaId';
import { PreguntaTexto } from '@/src/Encuestas/Domain/Entities/Pregunta/PreguntaTexto';
import { RespuestaRespuesta } from '../../Domain/Entities/RespuestaP/RespuestaRespuesta';
import { RespuestaPrimitive } from '../../Domain/Interfaces/RespuestaPrimitive';

export class UpdateRespuesta {
  public constructor(private readonly respuestaRepo: RespuestaRepository) {}

  public async run(id: string, respuesta: RespuestaPrimitive): Promise<void> {
    const respuestaId = new RespuestaId(id);

    const newRespuesta = new Respuesta(
      id ? new RespuestaId(id) : RespuestaId.retornoVacio(),
      new UsuarioId(respuesta.id_usuario),
      new EncuestaId(respuesta.id_encuesta),
      new RespuestaFecha(respuesta.fecha),
      respuesta.respuestas.map(
        resp =>
          new R(
            new PreguntaId(resp.id_pregunta),
            new PreguntaTexto(resp.texto),
            new RespuestaRespuesta(resp.respuesta),
          ),
      ),
    );

    await this.respuestaRepo.update(respuestaId.value, newRespuesta.toRespuestaPrimitive());
  }
}
