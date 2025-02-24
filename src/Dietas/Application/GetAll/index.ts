import { DietaQuery } from '../../Domain/Interfaces/FirebaseQuery';
import { DietaRepository } from '../../Domain/Entities/DietaRepository';
import { DietaPrimitive } from '../../Domain/Interfaces/DietaPrimitive';

export class GetAllDietas {
  public constructor(private readonly dietaRepo: DietaRepository) {}

  public async run(query: DietaQuery<DietaPrimitive>): Promise<DietaPrimitive[]> {
    const dietas = await this.dietaRepo.getAll(query);
    return dietas;
  }
}
