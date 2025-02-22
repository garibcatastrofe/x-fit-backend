import { AlimentoQuery } from '../../Domain/Interfaces/Query';
import { AlimentoRepository } from '../../Domain/Entities/AlimentoRepository';
import { AlimentoPrimitive } from '../../Domain/Interfaces/AlimentoPrimitive';

export class GetAllAlimentos {
  public constructor(private readonly alimentoRepo: AlimentoRepository) {}

  public async run(query: AlimentoQuery<AlimentoPrimitive>): Promise<AlimentoPrimitive[]> {
    const alimentos = await this.alimentoRepo.getAll(query);
    return alimentos;
  }
}
