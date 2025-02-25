import { RuffierRepository } from '../../Domain/Entities/RuffierRepository';

export class DeleteRuffier {
  public constructor(private readonly ruffierRepo: RuffierRepository) {}

  public async run(id: string): Promise<void> {
    await this.ruffierRepo.getById(id);
    await this.ruffierRepo.delete(id);
  }
}
