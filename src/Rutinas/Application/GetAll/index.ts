import { RutinaQuery } from '../../Domain/Interfaces/FirebaseQuery';
import { RutinaRepository } from '../../Domain/Entities/RutinaRepository';
import { RutinaPrimitive } from '../../Domain/Interfaces/RutinaPrimitive';

export class GetAllRutinas {
  public constructor(private readonly rutinaRepo: RutinaRepository) {}

  public async run(query: RutinaQuery<RutinaPrimitive>): Promise<RutinaPrimitive[]> {
    const rutinas = await this.rutinaRepo.getAll(query);
    return rutinas;
  }
}
