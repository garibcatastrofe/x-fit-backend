import { RespuestaRepository } from '../../Domain/Entities/RespuestaRepository';

export class DeleteRespuesta {
  public constructor(private readonly respuestaRepo: RespuestaRepository) {}

  public async run(id: string): Promise<void> {
    await this.respuestaRepo.getById(id);
    await this.respuestaRepo.delete(id);
  }
}
