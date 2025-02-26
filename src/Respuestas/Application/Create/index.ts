import { Respuesta } from '../../Domain/Entities/Respuesta';
import { RespuestaId } from '../../Domain/Entities/RespuestaId';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';
import { EncuestaId } from '@/src/Encuestas/Domain/Entities/EncuestaId';
import { RespuestaFecha } from '../../Domain/Entities/RespuestaFecha';
import { Respuesta as R } from '../../Domain/Entities/RespuestaP/Respuesta';
import { RespuestaRepository } from '../../Domain/Entities/RespuestaRepository';
import { RespuestaCreateDto } from '../../Domain/Interfaces/RespuestaCreateDto';
import { PreguntaId } from '@/src/Encuestas/Domain/Entities/Pregunta/PreguntaId';
import { PreguntaTexto } from '@/src/Encuestas/Domain/Entities/Pregunta/PreguntaTexto';
import { RespuestaRespuesta } from '../../Domain/Entities/RespuestaP/RespuestaRespuesta';

export class CreateRespuesta {
  public constructor(private readonly respuestaRepo: RespuestaRepository) {}

  public async run({
    id,
    id_usuario,
    id_encuesta,
    fecha,
    respuestas,
  }: RespuestaCreateDto): Promise<void> {
    const nuevaRespuesta = new Respuesta(
      id ? new RespuestaId(id) : RespuestaId.retornoVacio(),
      new UsuarioId(id_usuario),
      new EncuestaId(id_encuesta),
      new RespuestaFecha(fecha),
      respuestas.map(
        resp =>
          new R(
            new PreguntaId(resp.id_pregunta),
            new PreguntaTexto(resp.texto),
            new RespuestaRespuesta(resp.respuesta),
          ),
      ),
    );

    await this.respuestaRepo.create(nuevaRespuesta.toRespuestaPrimitive());
  }
}
