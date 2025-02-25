import { MedicionQuery } from '../../Domain/Interfaces/FirebaseQuery';
import { MedicionRepository } from '../../Domain/Entities/MedicionRepository';
import { MedicionPrimitive } from '../../Domain/Interfaces/MedicionPrimitive';

export class GetAllMediciones {
  public constructor(private readonly medicionRepo: MedicionRepository) {}

  public async run(query: MedicionQuery<MedicionPrimitive>): Promise<MedicionPrimitive[]> {
    const mediciones = await this.medicionRepo.getAll(query);
    return mediciones;
  }
}
