import { CpmpRepository } from '../../Domain/Entities/CpmpRepository';

export class DeleteCpmp {
  public constructor(private readonly cpmpRepo: CpmpRepository) {}
  public async run(id: number): Promise<void> {
    await this.cpmpRepo.getById(id);
    await this.cpmpRepo.delete(id);
  }
}
