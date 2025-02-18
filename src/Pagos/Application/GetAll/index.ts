import { IQuery } from '@/src/Shared/Domain/Interfaces/Query';
import { PagoRepository } from '../../Domain/Entities/PagoRepository';
import { PagoPrimitive } from '../../Domain/Interfaces/PagoPrimitive';

export class GetAllPagos {
  public constructor(private readonly pagoRepo: PagoRepository) {}

  public async run(query: IQuery<PagoPrimitive>): Promise<PagoPrimitive[]> {
    const pagos = await this.pagoRepo.getAll(query);

    return pagos;
  }
}
