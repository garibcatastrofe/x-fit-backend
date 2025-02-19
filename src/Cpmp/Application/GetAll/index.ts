import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { CpmpPrimitive } from '../../Domain/Interfaces/CpmpPrimitive';
import { CpmpRepository } from '../../Domain/Entities/CpmpRepository';

export class GetAllCpmp {
  public constructor(private cpmpRepository: CpmpRepository) {}

  public async run(query: IQuery<CpmpPrimitive>): Promise<CpmpPrimitive[]> {
    return await this.cpmpRepository.getAll(query);
  }
}
