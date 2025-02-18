import { EmpleadoRepository } from '../../Domain/Entities/EmpleadoRepository';

export class DeleteEmpleado {
  public constructor(private readonly empleadoRepo: EmpleadoRepository) {}
  public async run(id: number): Promise<void> {
    await this.empleadoRepo.getById(id);
    await this.empleadoRepo.delete(id);
  }
}
