import { RespuestaQuery } from '../../Domain/Interfaces/FirebaseQuery';
import { RespuestaRepository } from '../../Domain/Entities/RespuestaRepository';
import { RespuestaPrimitive } from '../../Domain/Interfaces/RespuestaPrimitive';

export class GetAllRespuestas {
  public constructor(private readonly respuestaRepo: RespuestaRepository) {}

  public async run(query: RespuestaQuery<RespuestaPrimitive>): Promise<RespuestaPrimitive[]> {
    const respuestas = await this.respuestaRepo.getAll(query);
    return respuestas;
  }
}
