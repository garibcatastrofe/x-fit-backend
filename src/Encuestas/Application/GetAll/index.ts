import { EncuestaQuery } from '../../Domain/Interfaces/FirebaseQuery';
import { EncuestaRepository } from '../../Domain/Entities/EncuestaRepository';
import { EncuestaPrimitive } from '../../Domain/Interfaces/EncuestaPrimitive';

export class GetAllEncuestas {
  public constructor(private readonly encuestaRepo: EncuestaRepository) {}

  public async run(query: EncuestaQuery<EncuestaPrimitive>): Promise<EncuestaPrimitive[]> {
    const encuestas = await this.encuestaRepo.getAll(query);
    return encuestas;
  }
}
