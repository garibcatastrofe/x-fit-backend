import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { AlimentoRepository } from '../../Domain/Entities/AlimentoRepository';
import { AlimentoPrimitive } from '../../Domain/Interfaces/AlimentoPrimitive';

export class GetAllAlimentos {
  public constructor(private readonly alimentoRepo: AlimentoRepository) {}

  public async run(query: IQuery<AlimentoPrimitive>): Promise<AlimentoPrimitive[]> {
    const alimentos = await this.alimentoRepo.getAll(query);
    return alimentos;
  }
}
